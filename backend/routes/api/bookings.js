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
        if(booking.Spot) {
            booking.Spot.previewImage = 'none';
            const prevImg = booking.Spot.SpotImages.find((el) => el.preview === true);
            if (prevImg) {
              booking.Spot.previewImage = prevImg.url;
            };
            delete booking.Spot.SpotImages;
        }
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

// router.put('/:bookingId', requireAuth, async (req, res) => {

// });

router.delete('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params;
    const user = req.user.id;
    const booking = await Booking.findByPk(bookingId);

    //if booking is missing
    if(!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found"
        })
    }

    //validate if user
    if(booking.userId !== user || booking.userId !== user) {
        return res.status(403).json({
            message: "Booking must belong to the current user or the Spot must belong to the current user"
        });
    };

    // Check if booking has already started
    const currTime = new Date().getTime();
    const bookingStartDate = new Date(booking.startDate).getTime();

    if (bookingStartDate <= currTime) {
        return res.status(403).json({
            message: "Bookings that have been started can't be deleted"
        });
    }

    await booking.destroy();
    return res.json({ message: "Successfully deleted" });
});

module.exports = router;
