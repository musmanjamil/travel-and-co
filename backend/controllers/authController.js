const User = require('../models/user');

const cloudinary = require("cloudinary");
const crypto = require('crypto');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require("../middleware/catchAsyncError");
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmails');

/// Register a user  =>   /api/v1/register
exports.registerUser = catchAsyncError(async (req, res, next) => {

   console.log(req.body.avatar)

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: "scale"
    });

    console.log('ok');

    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url,
        }
    });

    sendToken(user, 200, res);
});


// Login user  =>  /api/v1/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // Checks if email or password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & Password', 400));
    }

    // Finding user in database
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password.', 401));
    }

    // Check if password is correct
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    sendToken(user, 200, res);
});

// Get current user profile   =>   /api/v1/me
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

// Update current user Password   =>   /api/v1/password/update
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword);
    if (!isMatched) {
        return next(new ErrorHandler('Old Password is incorrect.', 401));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res);
});


// Update current user data   =>   /api/v1/me/update
exports.updateProfile = catchAsyncError(async (req, res, next) => {

    let newUserData = {
        name: req.body.name,
        email: req.body.email
    };

    if (req.body.avatar !== '') {

        const user = await User.findById(req.user.id);

        const image_id = user.avatar.public_id;

        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
        });

        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url,
        }

    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });


});

// Forgot Password  =>  /api/v1/password/forgot
exports.forgotPassword = catchAsyncError(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    // Check user email in database
    if (!user) {
        return next(new ErrorHandler('No user found with this email.', 404));
    }

    // Get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

    const message = `Your password reset link is as follow:\n\n${resetUrl}\n\n If you have not request this, then please ignore that.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'ShopIT Password Recovery',
            message
        });

        res.status(200).json({
            success: true,
            message: `Email sent successfully to: ${user.email}`
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }

});

// Reset Password   =>   /api/v1/password/reset/:token
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // Hash url token
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler('Password Reset token is invalid or has been expired.', 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match.', 400));
    }

    // Setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
});

// Logout user   =>   /api/v1/logout
exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: 'Logged out successfully.',
    });
});