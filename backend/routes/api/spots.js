const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');

const { User, Spot, SpotImage, Review, ReviewImage } = require('../../db/models');

router.get('/current', requireAuth, async (req, res) => {
    const id = req.user.id;
    const spots = await Spot.findAll({
        where: { ownerId: id },
        include: [
            { model: Review },
            { model: SpotImage }
        ]
    });

    //if no spots exist
    if (spots.length === 0) {
        return res.status(404).json({
            message: 'You have no spots'
        });
    }

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
        spot.avgRating = sum / spot.Reviews.length;
        delete spot.Reviews;
    });

    //create previewImage
    spotsList.forEach(spot => {
        spot.previewImage = 'none';
        const prevImg = spot.SpotImages.find((el) => el.preview === true);
        if(prevImg) {
            spot.previewImage = prevImg.url;
        }
        delete spot.SpotImages;
    });

    const result = {Spots: spotsList};
    return res.json(result);
});

router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params;

    const reviews = await Review.findAll({
        where: { spotId: spotId },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });

    //error handler
    if(!reviews.length) {
        return res.status(404).json({message: "Spot couldn't be found"})
    };

    return res.json({Reviews: reviews});
});

router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;
    const item = await Spot.findOne({
        where: { id: spotId },
        include: [
            { model: Review },
            {
                model: SpotImage,
                attributes: {
                    exclude: ['spotId', 'createdAt', 'updatedAt']
                }
            }
        ]
    });

    //error response
    if(!item) return res.status(404).json({
        message: "Spot couldn't be found"
    })

    //get spot in js format
    let spot = item.toJSON();

    //create numReviews
    spot.numReviews = spot.Reviews.length;

    //create avgStarRating
    let sum = 0;
    for(let i = 0; i < spot.Reviews.length; i++) {
        sum += spot.Reviews[i].stars
    }
    spot.avgStarRating = sum / spot.Reviews.length;
    delete spot.Reviews;

    //rearrange SpotImage
    const imgHolder = spot.SpotImages;
    delete spot.SpotImages;
    spot.SpotImages = imgHolder;

    //create owner
    spot.Owner = await User.findByPk(spot.ownerId, {
        attributes: ['id', 'firstName', 'lastName']
    })

    return res.json(spot);
});

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
        spot.avgRating = sum / spot.Reviews.length;
        delete spot.Reviews;
    });

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
});

router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url, preview } = req.body;
    const { spotId } = req.params;
    const userId = req.user.id;
    const spot = await Spot.findOne({
        where: { id: spotId, ownerId: userId }
    });

    //error response
    if(!spotId) {
        return res.status(404).json({message: "Spot couldn't be found"});
    };
    if(!spot) {
        return res.status(403).json({ message: "Only the owner can add images to this spot" });
    };

    //create the image
    const newImg = await SpotImage.create({
        spotId,
        url,
        preview
    });

    const imgData = newImg.toJSON();
    const resData = {
        id: imgData.id,
        url: imgData.url,
        preview: imgData.preview
    };

    return res.json(resData);
});

router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const { review, stars } = req.body;
    const spotId = parseInt(req.params.spotId);
    const userId = req.user.id;

    //error handlers
    let errRev;
    let errStars;
    if (!review) errRev = "Review text is required";
    if (!stars || stars < 1 || stars > 5) errStars = "Stars must be an integer from 1 to 5";
    if(errRev || errStars) {
        return res.status(400).json({
            message: "Bad Request",
            errors: { errRev, errStars}
        });
    };

    // Check if Spot exists
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found"
        });
    }

    // Check if user has already reviewed the Spot
    const exists = await Review.findOne({
        where: {
            userId,
            spotId
        }
    });
    if (exists) {
        return res.status(403).json({
            message: "User already has a review for this spot"
        });
    }

    //create review
    const newReview = await Review.create({
        userId,
        spotId,
        review,
        stars
    });
    return res.status(201).json(newReview);
})

router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    //error handler
    const errors = {};
    if (!address) errors.address = "Street address is required";
    if (!city) errors.city = "City is required";
    if (!state) errors.state = "State is required";
    if (!country) errors.country = "Country is required";
    if (!lat) errors.lat = "Latitude is not valid";
    if (!lng) errors.lng = "Longitude is not valid";
    if (!name || name.length > 50) errors.name = "Name must be less than 50 characters";
    if (!description) errors.description = "Description is required";
    if (!price) errors.price = "Price per day is required";

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            message: "Bad Request",
            errors
        });
    }

    //create new post
    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    return res.status(201).json(newSpot);
});

router.put('/:spotId', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const { spotId } = req.params;

    const exists = await Spot.findByPk(spotId);
    const spot = await Spot.findOne({
        where: { id: spotId, ownerId: req.user.id }
    });

    //error handlers
    if(!exists) {
        return res.status(404).json({message: "Spot couldn't be found"});
    };
    if(!spot) {
        return res.status(403).json({message: "Only the owner can update this spot"})
    };

    //if missing info
    const errors = {};
    if (!address) errors.address = "Street address is required";
    if (!city) errors.city = "City is required";
    if (!state) errors.state = "State is required";
    if (!country) errors.country = "Country is required";
    if (!lat) errors.lat = "Latitude is not valid";
    if (!lng) errors.lng = "Longitude is not valid";
    if (!name || name.length > 50) errors.name = "Name must be less than 50 characters";
    if (!description) errors.description = "Description is required";
    if (!price) errors.price = "Price per day is required";

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({
            message: "Bad Request",
            errors
        });
    }

    //update
    const updatedSpot = {
        address,
        city,
        state,
        lat,
        lng,
        name,
        description,
        price,
        updatedAt: new Date()
    };

    await spot.update(updatedSpot);

    return res.json(spot);
});

router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findOne({
        where: { id: spotId, ownerId: req.user.id }
    });

    //error handlers
    const exists = await Spot.findByPk(spotId);
    if(!exists) {
        return res.status(404).json({message: "Spot couldn't be found"});
    };
    if(!spot) {
        return res.status(403).json({message: "Only the owner can delete this spot"});
    };

    await spot.destroy();
    return res.json({message: "Successfully deleted"});
});

module.exports = router;
