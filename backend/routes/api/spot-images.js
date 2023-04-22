const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');

const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');

router.delete('/:imageId', requireAuth, async (req, res) => {
    const { imageId } = req.params;
    const user = req.user.id;
    const img = await SpotImage.findByPk(imageId);

    //if spotImage couldn't be found
    if(!img) {
        res.status(404).json({
            message: "Spot Image couldn't be found"
        })
    }

    //img must belong to current user
    const spot = await Spot.findByPk(img.spotId);
    if(user !== spot.ownerId) {
        return res.status(403).json({
            message: "Only the user can delete their spotImage"
        });
    }

    await img.destroy();

    return res.json({ message: "successfully deleted" });
})

module.exports = router;
