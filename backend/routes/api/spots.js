const express = require('express');
const router = express.Router();

const { Spot, SpotImage, Review } = require('../../db/models');

router.get('/:spotId', async (req, res) => {
    const { spotId }= req.params;
    const spots = await Spot.findAll({
        include: [
            { model: Review },
            { model: SpotImage }
        ]
    });
    //get all spots in js format
    let spotsList = [];
    spots.forEach(spot => {
        spotsList.push(spot.toJSON())
    });

    //create avgRating
    spotsList.forEach(spot => {
        let sum = 0;
        for(let i = 0; i < spot.Reviews.length; i++) {
            sum += spot.Reviews[i].stars
        }
        spot.avgRating = sum / spot.Reviews.length;;
        delete spot.Reviews;
    })

    //create previewImage
    spotsList.forEach(spot => {
            spot.SpotImages.forEach(image => {
                if(image.url) {
                    spot.previewImage = image.url;
                }
            })
        if(!spot.previewImage) {
            spot.previewImage = 'no image found';
        };
        delete spot.SpotImages;
    });
    const result = {Spots: spotsList};

    return res.json(result);
})

router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            { model: Review },
            { model: SpotImage }
        ]
    });
    //get all spots in js format
    let spotsList = [];
    spots.forEach(spot => {
        spotsList.push(spot.toJSON())
    });

    //create avgRating
    spotsList.forEach(spot => {
        let sum = 0;
        for(let i = 0; i < spot.Reviews.length; i++) {
            sum += spot.Reviews[i].stars
        }
        spot.avgRating = sum / spot.Reviews.length;;
        delete spot.Reviews;
    })

    //create previewImage
    spotsList.forEach(spot => {
            spot.SpotImages.forEach(image => {
                if(image.url) {
                    spot.previewImage = image.url;
                }
            })
        if(!spot.previewImage) {
            spot.previewImage = 'no image found';
        };
        delete spot.SpotImages;
    });

    const result = {Spots: spotsList};

    return res.json(result);
})

module.exports = router;
