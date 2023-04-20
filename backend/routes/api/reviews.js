const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');

const { User, Spot, SpotImage, Review, ReviewImage } = require('../../db/models');

router.get('/current', requireAuth, async (req, res) => {
    const id = req.user.id;
    const reviews = await Review.findAll({
        where: { userId: id },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt']
                },
                include: { model: SpotImage }
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });

    //get all reviews in js format
    let reviewsList = [];
    reviews.forEach(review => {
        reviewsList.push(review.toJSON())
    });

    //add perviewImage line
    reviewsList.forEach((review) => {
        review.Spot.previewImage = 'none';
        const prevImg = review.Spot.SpotImages.find((el) => el.preview === true);
        if (prevImg) {
          review.Spot.previewImage = prevImg.url;
        };
        delete review.Spot.SpotImages;
      });


    return res.json({Reviews: reviewsList});
});

module.exports = router;
