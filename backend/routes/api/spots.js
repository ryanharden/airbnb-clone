const express = require("express");
const sequelize = require("sequelize");
const { Spot, Review, User, SpotImage } = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");

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
    .withMessage("Price per day is required")
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

   if (errors.length) {
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
                Spots: allSpots
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


// Get all spots owned by current user

router.get("/current", requireAuth, async (req, res) => {

    const ownerId = +req.user.id;
    const spots = await Spot.findAll({
        where: {ownerId},
        attributes: {
            include: [
                [sequelize.col("SpotImages.url"), "previewImage"],
                [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"]
            ]
        },
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: SpotImage,
                attributes: []
            }
        ],
        group: ["Spot.id"]
    })
    res.json(spots)
});


    //     let spotList = [];

    //     spots.forEach(spot => {
    //         spotList.push(spot.toJSON())
    //     });

    //     let allSpots = [];

    //     spotList.forEach(async (spot) => {
    //         spot.SpotImages.forEach(image => {
    //             // console.log(image.preview)
    //             if (image.preview === true) {
    //                 spot.previewImage = image.url
    //             }
    //         })
    //         if (!spot.previewImage) {
    //             spot.previewImage = "no preview image found"
    //         }
    //         delete spot.SpotImages

    //         const reviews = await Review.findAll({
    //             where: {
    //                 spotId: spot.id
    //             },
    //             attributes: ["stars"]
    //         });

    //         let stars = 0;
    //         reviews.forEach(review => {
    //             stars += review.stars
    //         });

    //         const avgStars = stars/reviews.length;

    //         if (!avgStars) {
    //             spot.avgRating = "This is a new spot, no reviews yet!"
    //         } else {
    //             spot.avgRating = avgStars;
    //         };

    //         allSpots.push(spot);
    //         if (spot === spotList[spotList.length-1]) {
    //             res.json({
    //                 Spots: allSpots
    //             });
    //         }
    //     });
    // })


module.exports = router;
