const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');

const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');



module.exports = router;
