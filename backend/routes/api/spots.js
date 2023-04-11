const express = require("express");
const sequelize = require("sequelize");
const { Spot, Review, User, SpotImage, ReviewImage, Booking } = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");
const { response } = require("express");
const e = require("express");
const {
    multipleMulterUpload,
    multiplePublicFileUpload,
} = require("../../awsS3");

const validateReview = [
    check("review")
        .notEmpty()
        .withMessage("Review text is required"),
    // check("stars")
    //     .isInt({ min: 1, max: 5 })
    //     .withMessage("Stars must be an integer from 1 and 5"),
    handleValidationErrors
];

const validateSpot = [
    check("address")
        .notEmpty()
        .withMessage("Street address is required"),
    check("city")
        .notEmpty()
        .withMessage("City is required"),
    check("state")
        .notEmpty()
        .withMessage("State is required"),
    check("country")
        .notEmpty()
        .withMessage("Country is required"),
    check("lat")
        .isDecimal()
        .withMessage("Latitude is not valid"),
    check("lng")
        .isDecimal()
        .withMessage("Longitude is not valid"),
    check("name")
        .isLength({ max: 100 })
        .withMessage("Name must be less than 100 characters"),
    check("description")
        .notEmpty()
        .withMessage("Description is required"),
    check("price")
        .notEmpty()
        .isDecimal()
        .withMessage("Price per day is required"),
    handleValidationErrors
];

// Get all Spots

router.get("/", async (req, res) => {

    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    const errors = {};
    const pagination = {};
    const where = {};

    if (page) {
        if (isNaN(page) || page <= 0) {
            errors.page = "Page must be greater than or equal to 1"
        } else if (page > 10) {
            page = 10
        }
    } else {
        page = 1
    };

    if (size) {
        if (isNaN(size) || size <= 0) {
            errors.size = "Size must be greater than or equal to 1"
        } else if (size > 20) {
            size = 200
        }
    } else {
        size = 200
    };

    pagination.limit = +size;
    pagination.offset = (+page - 1) * +size;

    if (minLat) {
        if (isNaN(minLat)) {
            errors.minLat = "Minimum latitude is invalid"
        }
        where.lat = {
            [Op.gte]: minLat
        }
    };

    if (maxLat) {
        if (isNaN(maxLat)) {
            errors.maxLat = "Maximum latitude is invalid"
        } else if (minLat) {
            if (maxLat < minLat) {
                errors.maxLat = "Maximum latitude is invalid"
            }
        }
        where.lat = {
            [Op.lte]: maxLat
        }
    };

    if (minLng) {
        if (isNaN(minLng)) {
            errors.minLat = "Minimum longitude is invalid"
        }
        where.lng = {
            [Op.gte]: minLng
        }
    };

    if (maxLng) {
        if (isNaN(maxLng)) {
            errors.maxLng = "Maximum latitude is invalid"
        } else if (minLng) {
            if (maxLng < minLng) {
                errors.maxLng = "Maximum latitude is invalid"
            }
        }
        where.lng = {
            [Op.lte]: maxLng
        }
    };

    if (minPrice) {
        if (isNaN(minPrice) || minPrice < 0) {
            errors.minPrice = "Minimum price must be greater than or equal to 0"
        }
        where.price = {
            [Op.gte]: minPrice
        }
    };

    if (maxPrice) {
        if (isNaN(maxPrice) || maxPrice < 0) {
            errors.maxPrice = "Maximum price must be greater than or equal to 0"
        } else if (minPrice) {
            if (minPrice > maxPrice) {
                errors.maxPrice = "Maximum price must be greater than or equal to 0"
            }
        }
        where.price = {
            [Op.lte]: maxPrice
        }
    }

    if (Object.keys(errors).length) {
        res.status(400)
        return res.json({
            "message": "Validation Error",
            "statuscode": 400,
            "errors": errors
        })
    }

    const spots = await Spot.findAll({
        include: [
            { model: SpotImage },
        ],
        where,
        ...pagination
    });

    if (!spots.length) {
        return res.json({
            Spots: spots, page, size
        })
    }

    let spotList = [];

    spots.forEach(spot => {
        spotList.push(spot.toJSON())
    });

    let allSpots = [];

    spotList.forEach(async (spot) => {
        spot.SpotImages.forEach(image => {
            // console.log(image.preview)
            if (image.preview === true) {
                spot.previewImage = image.url
            }
        })
        if (!spot.previewImage) {
            spot.previewImage = "no preview image found"
        }
        delete spot.SpotImages

        const reviews = await Review.findAll({
            where: {
                spotId: spot.id
            },
            attributes: ["cleanliness", "communication", "checkin", "accuracy", "location", "value"]
        });

        let sumOfReviewAverages = 0;
        if (reviews.length > 0) {
            reviews.forEach((review) => {
                let reviewAverage = (
                    review.cleanliness +
                    review.accuracy +
                    review.communication +
                    review.location +
                    review.checkin +
                    review.value
                ) / 6;

                sumOfReviewAverages += reviewAverage;
            });
        }

        let avgSpotRating = 0;
        if (reviews.length > 0) {
            avgSpotRating = sumOfReviewAverages / reviews.length;
        }

        if (!avgSpotRating) {
            spot.avgRating = "This is a new spot, no reviews yet!"
        } else {
            spot.avgRating = avgSpotRating;
        };

        allSpots.push(spot);
        if (allSpots.length === spotList.length) {
            return res.json({
                Spots: allSpots, page, size
            });
        }
    });
});

// Get Search Spots
router.get("/search", async (req, res) => {
    const { city, state, country } = req.query;
    let spots = await Spot.findAll({
        where: {
            city: city,
            country: country,
        },
    });
    // if (spots.length === 0) {
    //     spots = await Spot.findAll({
    //         where: {
    //             state: state,
    //             country: country,
    //         },
    //     });
    // }

    if (spots.length === 0) {
        return res.json({ allSpots: [] });
    }


    let spotList = [];
    spots.forEach(spot => {
        spotList.push(spot.toJSON())
    });


    let allSpots = [];
    spotList.forEach(async (spot) => {
        const reviews = await Review.findAll({
            where: {
                spotId: spot.id
            },
            attributes: ["cleanliness", "communication", "checkin", "accuracy", "location", "value"]
        });
        let sumOfReviewAverages = 0;
        if (reviews.length > 0) {
            reviews.forEach((review) => {
                let reviewAverage = (
                    review.cleanliness + review.accuracy + review.communication + review.location + review.checkin + review.value
                ) / 6;
                sumOfReviewAverages += reviewAverage;
            });
        }
        let avgSpotRating = 0;
        if (reviews.length > 0) {
            avgSpotRating = sumOfReviewAverages / reviews.length;
        }
        if (!avgSpotRating) {
            spot.avgRating = "This is a new spot, no reviews yet!";
        } else {
            spot.avgRating = avgSpotRating;
        };

        const image = await SpotImage.findOne({
            where: {
                spotId: spot.id
            },
            attributes: ['url']
        });
        if (image) {
            spot.previewImage = image.url;
        } else {
            spot.previewImage = null;
        }

        allSpots.push(spot);
        if (allSpots.length === spotList.length) {
            return res.json({ allSpots });
        }
    });
});

// // Get Search Spots
// router.get("/search", async (req, res) => {
//     const { city, state, country } = req.query;

//     let spots = await Spot.findAll({
//         where: {
//             city: city,
//             country: country,
//         },
//     });

//     if (spots.length === 0) {
//         spots = await Spot.findAll({
//             where: {
//                 state: state,
//                 country: country,
//             },
//         });
//     }

//     res.json({ spots });
// });

// Create a spot
router.post("/", validateSpot, requireAuth, async (req, res) => {
    const ownerId = req.user.id;

    const newSpot = await Spot.create({ ownerId, ...req.body });

    return res.json(newSpot)
});

// Add an image to a Spot with aws

router.post("/:spotId/images", requireAuth, multipleMulterUpload("images"), async (req, res) => {
    const { spotId } = req.params;

    const awsUploadedFiles = await multiplePublicFileUpload(req.files);
    const newSpotImages = [];
    for (let i = 0; i < awsUploadedFiles.length; i++) {
        const awsFile = awsUploadedFiles[i];
        const newImage = await SpotImage.create({
            spotId: Number(spotId),
            url: awsFile,
            preview: i === 0 // Set preview to true only for the first image
        });
        newSpotImages.push(newImage);
    }
    return res.json(newSpotImages);
});

// Get all spots owned by current user

router.get("/current", requireAuth, async (req, res) => {

    const ownerId = +req.user.id;
    const spots = await Spot.findAll({
        where: { ownerId },
        include: { model: SpotImage }
    });

    let spotList = [];

    spots.forEach(spot => {
        spotList.push(spot.toJSON())
    });

    let allSpots = [];

    spotList.forEach(async (spot) => {
        spot.SpotImages.forEach(image => {
            // console.log(image.preview)
            if (image.preview === true) {
                spot.previewImage = image.url
            }
        })
        if (!spot.previewImage) {
            spot.previewImage = "no preview image found"
        }
        delete spot.SpotImages

        const reviews = await Review.findAll({
            where: {
                spotId: spot.id
            },
            attributes: ["stars"]
        });

        let stars = 0;
        reviews.forEach(review => {
            stars += review.stars
        });

        const avgStars = stars / reviews.length;

        if (!avgStars) {
            spot.avgRating = "This is a new spot, no reviews yet!"
        } else {
            spot.avgRating = avgStars;
        };

        allSpots.push(spot);
        if (spot === spotList[spotList.length - 1]) {
            return res.json({
                Spots: allSpots
            });
        }
    });
});

// Get details for a Spot by id

router.get("/:spotId", async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: SpotImage,
                attributes: ["id", "url", "preview"]
            },
            {
                model: User,
                as: "Owner",
                attributes: ["id", "firstName", "lastName"]
            }
        ]
    });

    if (!spot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    } else {
        const numReviews = await Review.count({
            where: { spotId: spot.id }
        })

        return res.json({
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            numReviews: numReviews,
            // avgStarRating: avgStars,
            SpotImages: spot.SpotImages,
            Owner: spot.Owner,
            category: spot.category,
            guests: spot.guests,
            bedrooms: spot.bedrooms,
            beds: spot.beds,
            bathrooms: spot.bathrooms,
            wifi: spot.wifi,
            parking: spot.parking,
            kitchen: spot.kitchen,
            pets: spot.pets,
            washer: spot.washer,
            dryer: spot.dryer
        })
    }
});

// Edit a spot

router.put("/:spotId", validateSpot, requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(400);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    } else if (spot.ownerId === +req.user.id) {
        const { address, city, state, country, lat, lng, name, description, price, category, guests, bedrooms, beds, bathrooms, wifi, parking, kitchen, pets, washer, dryer } = req.body;

        if (address) spot.address = address;
        if (city) spot.city = city;
        if (state) spot.state = state;
        if (country) spot.country = country;
        if (lat) spot.lat = lat;
        if (lng) spot.lng = lng;
        if (name) spot.name = name;
        if (description) spot.description = description;
        if (price) spot.price = price;
        if (category) spot.category = category;
        if (guests) spot.guests = guests;
        if (bedrooms) spot.bedrooms = bedrooms;
        if (beds) spot.beds = beds;
        if (bathrooms) spot.bathrooms = bathrooms;
        if (wifi) {
            spot.wifi = wifi;
        } else {
            spot.wifi = false
        }
        if (parking) {
            spot.parking = parking;
        } else {
            spot.parking = false
        }
        if (kitchen) {
            spot.kitchen = kitchen;
        } else {
            spot.kitchen = false;
        }
        if (pets) {
            spot.pets = pets;
        } else {
            spot.pets = false;
        }
        if (washer) {
            spot.washer = washer;
        } else {
            spot.washer = false;
        }
        if (dryer) {
            spot.dryer = dryer;
        } else {
            spot.dryer = false;
        }

        await spot.save();
        return res.json(spot);
    } else {
        res.statusCode = 403;
        return res.json({
            "message": "You are not authorized",
            "statusCode": 403
        })
    }
});

// Create a Review for a Spot by Spot Id

router.post("/:spotId/reviews", validateReview, requireAuth, async (req, res) => {
    const spotId = +req.params.spotId;
    const { review, cleanliness, communication, checkin, accuracy, location, value } = req.body;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    const userId = +req.user.id;
    const userReview = await Review.findOne({
        where: {
            userId,
            spotId
        }
    });

    if (userReview) {
        res.status(403);
        return res.json({
            "message": "User already has a review for this spot",
            "statusCode": 403
        })
    }
    const newReview = await spot.createReview({
        userId,
        spotId,
        review,
        cleanliness,
        communication,
        checkin,
        accuracy,
        location,
        value
    });
    return res.json(newReview)
});

// Get all Reviews by a Spot's Id

router.get("/:spotId/reviews", async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    };

    const Reviews = await Review.findAll({
        where: {
            spotId: +req.params.spotId
        },
        include: [
            {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            },
            {
                model: ReviewImage,
                attributes: ["id", "url"]
            }
        ]
    });
    return res.json({ Reviews });
});

// Create a Booking from a Spot based on the Spot's id

router.post("/:spotId/bookings", requireAuth, async (req, res) => {

    const { startDate, endDate, total, guests } = req.body;
    const spotId = +req.params.spotId;
    const userId = req.user.id;

    const startDateInt = new Date(startDate).getTime();
    const endDateInt = new Date(endDate).getTime();


    const spot = await Spot.findOne({
        where: {
            id: spotId,
        },
        [Op.not]: { ownerId: req.user.id }
    });

    if (!spot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    if (spot.ownerId === userId) {
        res.status(403);
        return res.json({
            "message": "Can't create booking for your own spot",
            "statusCode": 403
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

    const currentBookings = await Booking.findAll({
        where: {
            spotId
        }
    });

    for (let booking of currentBookings) {
        const bookingStartDate = new Date(booking.startDate).getTime();
        const bookingEndDate = new Date(booking.endDate).getTime();

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
    };

    const newBooking = await Booking.create({
        spotId,
        userId,
        startDate,
        endDate,
        total,
        guests
    });
    return res.json(newBooking)
});

// Get all Bookings for a Spot based on the Spot's id

router.get("/:spotId/bookings", requireAuth, async (req, res) => {
    const spotId = +req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    };

    if (spot.ownerId !== req.user.id) {
        const Bookings = await Booking.findAll({
            where: { spotId },
            attributes: ["id", "spotId", "startDate", "endDate"]
        });
        return res.json({ Bookings })
    }

    if (spot.ownerId === req.user.id) {
        const Bookings = await Booking.findAll({
            where: { spotId },
            attributes: ["id", "spotId", "startDate", "endDate"],
            include: {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            }
        });
        return res.json({ Bookings })
    }
});

// Delete a spot

router.delete("/:spotId", requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(404);
        return res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    if (spot.ownerId === +req.user.id) {
        await spot.destroy();
        res.status(200);
        return res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    } else {
        res.status(403);
        return res.json({
            "message": "Spot does not belong to you",
            "statusCode": 403
        })
    }
});

module.exports = router;
