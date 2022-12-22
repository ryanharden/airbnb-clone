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

// Add an Image to a Review based on the Review's id

router.post("/:reviewId/images", requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId;
    const { url } = req.body;
    const review = await Review.findByPk(reviewId);

    if (!review) {
        res.status(404);
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    const reviewImageCount = await ReviewImage.count({
        where: {
            reviewId
        }
    });

    if (reviewImageCount >= 10) {
        res.status(403);
        res.json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        })
    }

    const newReviewImage = await ReviewImage.create({
        reviewId,
        url
    });

    const reviewImage = await ReviewImage.findByPk(newReviewImage.id, {
        attributes: ["id", "url"]
    })

    res.json(reviewImage)
})

module.exports = router;
