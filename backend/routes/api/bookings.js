const express = require('express');
const router = express.Router();

const { requireAuth } = require('../../utils/auth');

const { User, Spot, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');

router.get('/current', requireAuth, async (req, res) => {
    const user = req.user.id;
    const bookings = await Booking.findAll({
        where: { userId: user },
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

router.put('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params;
    const { startDate, endDate } = req.body;
    const user = req.user.id;
    const booking = await Booking.findByPk(bookingId);

    //if no booking
    if(!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" })
    };

    //if not user
    if(booking.userId !== user) {
        return res.status(403).json({
            message: "Only the user can edit their booking"
        });
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

    //if the booking is in the past
    const today = new Date();
    if (today.getTime() > new Date(booking.endDate).getTime()) {
      return res.status(403).json({
          message: "Past bookings can't be modified"
      });
    }

    //check for booking conflicts
    const currBookings = await Booking.findAll({
        where: { spotId: booking.spotId }
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

    const updatedBooking = {
        startDate,
        endDate,
        updatedAt: new Date()
    };

    await booking.update(updatedBooking);

    return res.json(booking);
});

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
