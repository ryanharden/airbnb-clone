const express = require("express");
const sequelize = require("sequelize");
const { Spot, Review, User, SpotImage, ReviewImage, Booking } = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize");
const { response } = require("express");

const validateReview = [
    check("review")
        .notEmpty()
        .withMessage("Review text is required"),
    check("stars")
        .isInt({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 and 5"),
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
    .isLength({max: 50})
    .withMessage("Name must be less than 50 characters"),
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
        size = 20
    }
   } else {
    size = 20
   };

   pagination.limit = +size;
   pagination.offset = (+page -1) * +size;

   if (minLat) {
    if (!Number.isInteger(minLat)) {
        errors.minLat = "Minimum latitude is invalid"
    }
    where.lat = {
        [Op.gte]: minLat
    }
   };

   if (maxLat) {
    if (!Number.isInteger(maxLat)) {
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
    if (!Number.isInteger(minLng)) {
        errors.minLat = "Minimum longitude is invalid"
    }
    where.lng = {
        [Op.gte]: minLng
    }
   };

   if (maxLng) {
    if (!Number.isInteger(maxLng)) {
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
    if (!Number.isInteger(minPrice) || minPrice < 0) {
        errors.minPrice = "Minimum price must be greater than or equal to 0"
    }
    where.price = {
        [Op.gte]: minPrice
    }
   };

   if (maxPrice) {
    if (!Number.isInteger(maxPrice) || maxPrice < 0) {
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
            attributes: ["stars"]
        });

        let stars = 0;
        reviews.forEach(review => {
            stars += review.stars
        });

        const avgStars = stars/reviews.length;

        if (!avgStars) {
            spot.avgRating = "This is a new spot, no reviews yet!"
        } else {
            spot.avgRating = avgStars;
        };

        allSpots.push(spot);
        if (allSpots.length === spotList.length) {
            res.json({
                Spots: allSpots, page, size
            });
        }
    });
});

// Create a spot
router.post("/", validateSpot, requireAuth, async (req, res) => {
    const ownerId = req.user.id;

    const newSpot = await Spot.create({ownerId, ...req.body});

    res.json(newSpot)
});

// Add an image to a Spot based on the Spot's id

router.post("/:spotId/images", requireAuth, async (req, res) => {
    const { url, preview } = req.body;

    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    const spotId = +req.params.spotId;

    const newImage = await SpotImage.create({
        spotId,
        url,
        preview
    });

    const newSpotImage = await SpotImage.findByPk(newImage.id, {
        attributes: ["id", "url", "preview"]
    });

    return res.json(newSpotImage);
});

// Get all spots owned by current user

router.get("/current", requireAuth, async (req, res) => {

    const ownerId = +req.user.id;
    const spots = await Spot.findAll({
        where: {ownerId},
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

        const avgStars = stars/reviews.length;

        if (!avgStars) {
            spot.avgRating = "This is a new spot, no reviews yet!"
        } else {
            spot.avgRating = avgStars;
        };

        allSpots.push(spot);
        if (spot === spotList[spotList.length-1]) {
            res.json({
                Spots: allSpots
            });
        }
    });

    //     where: {ownerId},
    //     attributes: {
    //         include: [
    //             [sequelize.col("SpotImages.url"), "previewImage"],
    //             [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]
    //         ]
    //     },
    //     include: [
    //         {
    //             model: Review,
    //             attributes: []
    //         },
    //         {
    //             model: SpotImage,
    //             attributes: []
    //         }
    //     ],
    //     group: ["Spot.id"]
    // })
    // res.json(spots)
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
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    } else {
        const numReviews = await Review.count({
            where: { spotId: spot.id}
        })

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

        const avgStars = stars/reviews.length;

        if (!avgStars) {
            spot.avgRating = "This is a new spot, no reviews yet!"
        } else {
            spot.avgRating = avgStars;
        };

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
            avgStarRating: avgStars,
            SpotImages: spot.SpotImages,
            Owner: spot.Owner
        })
    }

    //     attributes: {
    //         include: [
    //             [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgStarRating"],
    //             [sequelize.fn("COUNT", sequelize.col("Reviews.id")), "numReviews"]
    //         ]
    //     },
    //     include: [
    //         {
    //             model: Review,
    //             attributes: []
    //         },
    //         {
    //             model: SpotImage,
    //             attributes: ["id", "url", "preview"]
    //         },
    //         {
    //             model: User,
    //             as: "Owner",
    //             attributes: ["id", "firstName", "lastName"]
    //         }
    //     ],
    //     group: ["Spot.id"]
    // });

    // if (!spot) {
    //     res.status(404);
    //     res.json({
    //         "message": "Spot couldn't be found",
    //         "statusCode": 404
    //     })
    // }

    // res.json(spot)
});

// Edit a spot

router.put("/:spotId", validateSpot,requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(400);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    } else if (spot.ownerId === +req.user.id) {
        const { address, city, state, country, lat, lng, name, description, price } = req.body;

        if (address) spot.address = address;
        if (city) spot.city = city;
        if (state) spot.state = state;
        if (country) spot.country = country;
        if (lat) spot.lat = lat;
        if (lng) spot.lng = lng;
        if (name) spot.name = name;
        if (description) spot.description = description;
        if (price) spot.price = price;

        await spot.save();
        return res.json(spot);
    }
});

// Create a Review for a Spot by Spot Id

router.post("/:spotId/reviews", validateReview, requireAuth, async (req, res) => {
    const spotId  = +req.params.spotId;
    const { review, stars } = req.body;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404);
        res.json({
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
        res.json({
            "message": "User already has a review for this spot",
            "statusCode": 403
        })
    }
    const newReview = await spot.createReview({
        userId,
        spotId,
        review,
        stars
    });
    res.json(newReview)
});

// Get all Reviews by a Spot's Id

router.get("/:spotId/reviews", async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(404);
        res.json({
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
    res.json({Reviews});
});

// Create a Booking from a Spot based on the Spot's id

router.post("/:spotId/bookings", requireAuth, async (req, res) => {

    const { startDate, endDate } = req.body;
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
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    if (spot.ownerId === userId) {
        res.status(403);
        res.json({
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
        endDate
    });
    return res.json(newBooking)
});

// Get all Bookings for a Spot based on the Spot's id

router.get("/:spotId/bookings", requireAuth, async (req, res) => {
    const spotId = +req.params.spotId;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    };

    if (spot.ownerId !== req.user.id) {
        const Bookings = await Booking.findAll({
            where: spotId,
            attributes: ["spotId", "startDate", "endDate"]
        });
        res.json({Bookings})
    }

    if (spot.ownerId === req.user.id) {
        const Bookings = await Booking.findAll({
            where: spotId,
            include: {
                model: User,
                attributes: ["id", "firstName", "lastName"]
            }
        });
        res.json({Bookings})
    }
});

// Delete a spot

router.delete("/:spotId", requireAuth, async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(404);
        res.json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    } else if (spot.ownerId === +req.user.id) {
        await spot.destroy();
        res.status(200);
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }
});

module.exports = router;
