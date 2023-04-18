const express = require('express');
const router = express.Router();

const { Spot, SpotImage, Review } = require('../../db/models');

router.get('/', async (req, res) => {
    const spots = await Spot.findAll();

    const avg = await Review.findAll({
        attributes: ['stars'],
        where: {
            spotId: Spot.id
        }
    });


    return res.json(avg);
})

module.exports = router;
