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

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { reviewId } = req.params;
    const { url } = req.body;
    const user = req.user.id;
    const review = await Review.findByPk(reviewId);
    const revImgs = await ReviewImage.findAll();

    //if no review exists
    if(!review) {
        return res.status(404).json({ message: "Review couldn't be found" });
    };

    //review must be current user
    const isOwner = await Review.findOne({
        where: {
            userId: user
        }
    });
    if(user !== review.userId) {
        return res.status(403).json({ message: "Only the owner can add images to this review" });
    };

    //if 10 images already exists
    if(revImgs.length > 10) {
        return res.status(403).json({ "message": "Maximum number of images for this resource was reached" });
    }



    const newRevImg = await ReviewImage.create({
        reviewId,
        url
    });

    const newImg = await ReviewImage.findOne({
        where: { id: newRevImg.id },
        attributes: ['id', 'url']
    })

    return res.json(newImg)
});

module.exports = router;
