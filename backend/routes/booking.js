const express = require('express')
const router = express.Router();

const {
    newBooking,
    allBookings,
    deleteBooking,
    myBookings

} = require('../controllers/bookingController')

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

router.route('/bookings/me').get(isAuthenticatedUser, myBookings);

router.route('/admin/booking/new').post(isAuthenticatedUser, newBooking);
router.route('/admin/booking').get(isAuthenticatedUser, allBookings);
router.route('/admin/booking/:id').delete(isAuthenticatedUser, deleteBooking);

module.exports = router;