const jwt = require('jsonwebtoken');
const User = require('../models/user');
const catchAsyncErrors = require('./catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');

// Check if the user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    // let token = null;

    // if (
    //     req.headers.authorization &&
    //     req.headers.authorization.startsWith('Bearer')
    // ) {
    //     token = req.headers.authorization.split(' ')[1];
    // }

    const { token } = req.cookies;

    if (!token) {
        return next()
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
});

// Handling users roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(
                    `Role(${req.user.role}) is not allowed to access this resource.`,
                    403
                )
            );
        }
        next();
    };
};