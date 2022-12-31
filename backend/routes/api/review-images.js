const express = require("express");
const sequelize = require("sequelize");
const { Spot, Review, User, SpotImage, ReviewImage, Booking } = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

// Delete a Review Image

router.delete("/:imageId", requireAuth, async (req, res) => {
    const imageId = +req.params.imageId;
    const currentUserId = req.user.id;

    const reviewImage = await ReviewImage.findByPk(imageId);

    if (!reviewImage) {
        res.status(404);
        return res.json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    }
    const reviewImageObj = reviewImage.toJSON();

    const review = await Review.findOne({
        where: {
            userId: currentUserId,
            id: reviewImageObj.reviewId
        }
    });

    if (!review) {
        res.status(404);
        return res.json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    await reviewImage.destroy();
    res.status(200);
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

module.exports = router;
