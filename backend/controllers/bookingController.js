const Booking = require('../models/booking');

const catchAsyncErrors = require('../middleware/catchAsyncError');

// Create a new order   =>  /api/v1/order/new
exports.newBooking = catchAsyncErrors(async (req, res, next) => {
    const {
        tour,
        price,
        tourPackage,
        date,
    } = req.body;

    const booking = await Booking.create({
        tour,
        price,
        tourPackage,
        user: req.user._id,
        date
    })

    res.status(200).json({
        success: true,
        booking
    })
})