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
});

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


// Edit a Review

router.put("/:reviewId", validateReview, requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId;
    const { review, stars } = req.body;
    const oldReview = await Review.findByPk(reviewId);

    if (!oldReview) {
        res.status(404);
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    } else {
        await oldReview.update({
            review,
            stars
        });
        res.json(oldReview);
    }
});

// Delete a Review

router.delete("/:reviewId", requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId;
    const review = await Review.findByPk(reviewId, {
        where: {
            userId: req.user.id
        }
    });

    if (!review) {
        res.status(404);
        res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    } else {
        if (req.user.id === review.userId) {
            await review.destroy()
            res.status(200);
            res.json({
                "message": "Successfully deleted",
                "statusCode": 200
            })
        } else {
            res.status(403);
            res.json({
                "message": "This review does not belong to you",
                "statusCode": 403
            })
        }
    }
});

module.exports = router;
