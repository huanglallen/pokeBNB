const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');

const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');

router.get('/current', requireAuth, async (req, res) => {
    const user = req.user.id;
    const bookings = await Booking.findAll({
        where: { userid: user },
        include: [
            {
                model: Spot,
                exclude: ['createdAt', 'updatedAt'],
                include: { model: SpotImage }
            },
        ],
    });
    //get all bookings in js format
    let bookingsList = [];
    bookings.forEach(booking => {
        bookingsList.push(booking.toJSON())
    });

    //add previewImage
    bookingsList.forEach((booking) => {
        booking.Spot.previewImage = 'none';
        const prevImg = booking.Spot.SpotImages.find((el) => el.preview === true);
        if (prevImg) {
          booking.Spot.previewImage = prevImg.url;
        };
        delete booking.Spot.SpotImages;
      });

    //reposition columns
    const result = bookingsList.map(booking => ({
        id: booking.id,
        spotId: booking.spotId,
        Spot: booking.Spot,
        userId: booking.userId,
        startDate: booking.startDate,
        endDate: booking.endDate,
        createdAt: booking.createdAt,
        updatedAt: booking.updatedAt,
    }));

    return res.json({ Bookings: result });
});

module.exports = router;
