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

// Edit a Booking

router.put("/:bookingId", requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    const bookingId = +req.params.bookingId;
    const currentUserId = req.user.id;
    const startDateInt = new Date(startDate).getTime();
    const endDateInt = new Date(endDate).getTime();

    const oldBooking = await Booking.findOne({
        where: {
            id: bookingId,
            userId: currentUserId
        }
    });

    if (!oldBooking) {
        res.status(404);
        res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }

    if (startDateInt >= endDateInt) {
        res.status(400);
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "endDate": "endDate cannot be on or before startDate"
            }
        })
    }

    const bookingStartDate = new Date(oldBooking.startDate).getTime();
    const bookingEndDate = new Date(oldBooking.endDate).getTime();

    if (startDateInt <= Date.now() || bookingStartDate <= Date.now()) {
        res.status(403);
        return res.json({
            "message": "Past bookings can't be modified",
            "statusCode": 403
        })
    };

    if ((startDateInt >= bookingStartDate && startDateInt < bookingEndDate) ||
        (endDateInt > bookingStartDate && endDateInt <= bookingEndDate)) {
        res.status(403);
        return res.json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            }
        })
    }

   await oldBooking.update({
        startDate,
        endDate
    });
    res.json(oldBooking)
});



module.exports = router;
