const express = require('express')
const router = express.Router();

const {
    newBooking,
} = require('../controllers/bookingController')

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth')

router.route('/admin/booking/new').post(isAuthenticatedUser, newBooking);

module.exports = router;