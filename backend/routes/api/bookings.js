const express = require("express");
const sequelize = require("sequelize");
const { Spot, Review, User, SpotImage, ReviewImage, Booking } = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

// Get all of the Current User's Bookings

router.get("/current", requireAuth, async (req, res) => {
    const currentUserId = +req.user.id;

    const bookings = await Booking.findAll({
        where: {
            userId: currentUserId
        },
        include: [
            {
                model: Spot,
                attributes: {
                    exclude: ["description", "createdAt", "updatedAt"]
                },
                include: [
                    { model: SpotImage }
                ]
            }
        ]
    });

    let bookingsList = [];

    bookings.forEach(async (booking) => {
        bookingsList.push(booking.toJSON())
    });

    let allBookings = [];

    bookingsList.forEach(async (booking) => {
        booking.Spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                booking.Spot.previewImage = image.url
            }
        })
        if (!booking.Spot.previewImage) {
            booking.Spot.previewImage = "no preview image found"
        }
        delete booking.Spot.SpotImages;

        allBookings.push(booking);
        if (booking === bookingsList[bookingsList.length -1]) {
            res.json({
                Bookings: allBookings
            });
        }
    });

});

module.exports = router;
