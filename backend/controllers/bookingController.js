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
// Get logged in user bookings   =>   /api/v1/bookings/me
exports.myBookings = catchAsyncErrors(async (req, res, next) => {
    const bookings = await Booking.find({ user: req.user.id }).populate('tour')

    res.status(200).json({
        success: true,
        bookings
    })
})
// Get all Bookings - ADMIN  =>   /api/v1/admin/bookings/
exports.allBookings = catchAsyncErrors(async (req, res, next) => {
    const bookings = await Booking.find().populate('user').populate('tour')

    res.status(200).json({
        success: true,
        bookings
    })
})
// Delete Booking   =>   /api/v1/admin/booking/:id
exports.deleteBooking = catchAsyncErrors(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
        return next(new ErrorHandler('No Booking found with this ID', 404))
    }

    await booking.remove()

    res.status(200).json({
        success: true
    })
})