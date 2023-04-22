const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');

const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');

router.delete('/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params;
    const user = req.user.id;
    const img = await ReviewImage.findByPk(imageId);

    //if reviewImage couldn't be found
    if(!img) {
        res.status(404).json({
            message: "Review Image couldn't be found"
        })
    }

    //img must belong to current user
    const review = await Review.findByPk(img.reviewId);
    if(user !== review.userId) {
        return res.status(403).json({
            message: "Only the user can delete their reviewImage"
        });
    };

    await img.destroy();

    return res.json({ message: "successfully deleted" });
});

module.exports = router;
