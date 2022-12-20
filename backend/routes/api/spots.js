const express = require("express");
const sequelize = require("sequelize");
const { Spot } = require("../../db/models");
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
