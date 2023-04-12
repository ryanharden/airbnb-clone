const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { googleMapsAPIKey } = require('../../config');

router.post('/key', (req, res) => {
  res.json({ googleMapsAPIKey });
});

module.exports = router;
