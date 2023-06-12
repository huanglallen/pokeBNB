const express = require('express');
const router = express.Router();
const { Op } = require('sequelize')
const { requireAuth } = require('../../utils/auth');

const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');

router.get('/current', requireAuth, async (req, res) => {
    const id = req.user.id;
    const spots = await Spot.findAll({
        where: { ownerId: id },
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
        console.log('backend_REVIEWS')
        return res.json({Reviews: []})
    };

    return res.json({Reviews: reviews});
});

router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const user = req.user.id;
    const bookings = await Booking.findAll({
        where: { spotId: spotId },
        attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
        include: [
          {
            model: User,
            as: 'User',
            attributes: ['id', 'firstName', 'lastName']
          }
        ]
      });

    //if no spotId found
    if(!bookings.length) {
        return res.status(404).json({message: "Spot couldn't be found"})
    };

    const isOwner = await Spot.findAll({
        where: { ownerId: user }
    });

    //if not the owner
    if(!isOwner) {
        return res.json({ Bookings: bookings })
    };

    const bookingsList = bookings.map(booking => ({
        User: booking.User,
        id: booking.id,
        spotId: booking.spotId,
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt
      }));
    return res.json({ Bookings: bookingsList});
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
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    //validate query parameters
    const errors = {};
    if(page && (isNaN(page) || page < 1)) {
        errors.page = "Page must be greater than or equal to 1";
    };
    if(size && (isNaN(size) || size < 1)) {
        errors.size = "Size must be greater than or equal to 1";
    };
    if(minLat && isNaN(minLat)) {
        errors.minLat = "Minimum latitude is invalid";
    };
    if(maxLat && isNaN(maxLat)) {
        errors.maxLat = "Maximum latitude is invalid";
    };
    if(minLng && isNaN(minLng)) {
        errors.minLng = "Minimum longitude is invalid";
    };
    if(maxLng && isNaN(maxLng)) {
        errors.maxLng = "Maximum longitude is invalid";
    };
    if(minPrice && (isNaN(minPrice) || minPrice < 0)) {
        errors.minPrice = "Minimum price must be a decimal greater than or equal to 0";
    };
    if(maxPrice && (isNaN(maxPrice) || maxPrice < 0)) {
        errors.maxPrice = "Maximum price must be a decimal greater than or equal to 0";
    };

    if(Object.keys(errors).length) {
        return res.status(400).json({
            message: "Validation error",
            errors
        });
    };

    //search query
    const query = {};
    if(minLat && maxLat) {
        query.lat = { [Op.between]: [minLat, maxLat] };
    } else if(minLat) {
        query.lat = { [Op.gte]: minLat };
    } else if(maxLat) {
        query.lat = { [Op.lte]: maxLat };
    }
    if(minLng && maxLng) {
        query.lng = { [Op.between]: [minLng, maxLng] };
    } else if(minLng) {
        query.lng = { [Op.gte]: minLng };
    } else if(maxLng) {
        query.lng = { [Op.lte]: maxLng };
    }
    if(minPrice && maxPrice) {
        query.price = { [Op.between]: [minPrice, maxPrice] };
    } else if(minPrice) {
        query.price = { [Op.gte]: minPrice };
    } else if(maxPrice) {
        query.price = { [Op.lte]: maxPrice };
    }

    //pagination
    const pagination = {};

    if(!page) page = 1;
    if(!size) size = 20;

    if(page <= 10 && size <= 20) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }

    const spots = await Spot.findAll({
        include: [
            { model: Review },
            { model: SpotImage }
        ],
        where: query,
        ...pagination
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
    const findSpot = await Spot.findByPk(spotId);

    //error response
    if(!findSpot) {
        return res.status(404).json({message: "Spot couldn't be found"});
    };
    if(!spot) {
        return res.status(403).json({ message: "Only the owner can add images to this spot" });
    };
    if(!url) {
        return res.status(404).json({ message: "Image is required"})
    };
    if(url && !url.endsWith('.jpg') && !url.endsWith('.jpeg') && !url.endsWith('.png')) {
        return res.status(500).json({ message: "Image URL must end in .png, .jpg, or .jpeg"})
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

router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { startDate, endDate } = req.body;
    const user = req.user.id;
    const spot = await Spot.findByPk(spotId);

    const bookings = await Booking.findAll({
        where: { spotId: spotId }
    });

    //cannot find spot
    if(!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" })
    };

    //Spot must NOT belong to current user
    if(spot.ownerId === user) {
        return res.status(403).json({ message: "Owner cannot book their own spot" })
    };

    //body validation error
    if(!endDate || new Date(endDate) <= new Date(startDate)) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
              "endDate": "endDate cannot be on or before startDate"
            }
          });
    };

    //check for booking conflicts
    const currBookings = await Booking.findAll({
        where: {
        spotId: spotId
        }
    });

    const sdTime = new Date(startDate).getTime();
    const edTime = new Date(endDate).getTime();

    for(let booking of currBookings) {
        const err = {};
        const bookingS = new Date(booking.startDate).getTime();
        const bookingE = new Date(booking.endDate).getTime();


        if(bookingS <= sdTime && bookingE >= sdTime) {
            err.startDate = "Start date conflicts with an existing booking";
        };
        if (bookingS <= edTime && bookingE >= edTime) {
        err.endDate = "End date conflicts with an existing booking";
        };

        if(Object.keys(err).length > 0) {
            return res.status(403).json({
                message: "Sorry, this spot is already booked for the specified dates",
                errors: err
                });
        }
    }

    //create booking
    const newBooking = await Booking.create({
        spotId: parseInt(spotId),
        userId: user,
        startDate,
        endDate
    });

    return res.json(newBooking);
});

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
    if(description.length < 30) errors.description = "Description needs a minimum of 30 characters"
    if (!price || price < 1) errors.price = "Price per day is required";

    if (Object.keys(errors).length > 0) {
        return res.status(500).json({
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
    return res.json({ message: "Successfully deleted" });
});

module.exports = router;
