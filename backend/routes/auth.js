const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    getUserProfile,
    updatePassword,
    updateProfile,
    forgotPassword,
    resetPassword,
    logout
} = require('../controllers/authController');

const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

router.route('/login').post(loginUser);
router.route('/register').post(registerUser);

router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/logout').get(isAuthenticatedUser, logout);

router.route('/password/update').put(isAuthenticatedUser, updatePassword);
router.route('/me/update').put(isAuthenticatedUser, updateProfile);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);



module.exports = router;