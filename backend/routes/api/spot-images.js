const express = require("express");
const sequelize = require("sequelize");
const { Spot, Review, User, SpotImage, ReviewImage, Booking } = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

// Delete a Spot Image

router.delete("/:imageId", requireAuth, async (req, res) => {
    const imageId = +req.params.imageId;
    const spotImage = await SpotImage.findByPk(imageId);
    const currentUserId = req.user.id;

    if (!spotImage) {
        res.status(404);
        res.json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
    }
    // console.log(spotImage);
    const imageObj = spotImage.toJSON();

    const spot = await Spot.findOne({
        where: {
            ownerId: currentUserId,
            id: imageObj.spotId
        }
    });

    if (!spot) {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    await spotImage.destroy();
    res.status(200);
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
});

module.exports = router;
