const express = require("express");
const sequelize = require("sequelize");
const { requireAuth } = require("../../utils/auth");
const { Spot, Review, User, ReviewImage, SpotImage } = require("../../db/models");
const router = express.Router();
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

const validateReview = [
    check("review")
    .notEmpty()
    .withMessage("Review text is required"),
    check("stars")
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 and 5"),
    handleValidationErrors
];

// Get all Reviews of the Current User

router.get("/current", requireAuth, async (req, res) => {
    const currentUser = +req.user.id;

    const reviews = await Review.findAll({
        where: {
            userId: currentUser
        },
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            },
            {
                model: Spot,
                attributes: { exclude: ["description", "createdAt", "updatedAt"]}
            },
            {
                model: ReviewImage,
                attributes: ["id", "url"]
            }
        ]
    });
    console.log(reviews);

    let reviewList = [];

    for (let review of reviews) {
        const reviewObject = review.toJSON();
        const spotImage = await SpotImage.findOne({
            where: {
                spotId: review.Spot.id,
                preview: true
            }
        });

        if (!spotImage) {
            reviewObject.Spot.previewImage = "There was no preview image found for this Spot!"
        } else {
            reviewObject.Spot.previewImage = spotImage.url
        };

        reviewList.push(reviewObject);
    }
    res.json({Reviews: reviewList});
});

module.exports = router;
