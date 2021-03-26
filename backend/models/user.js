const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name.'],
        maxlength: [50, 'Your name can not exceed 50 characters.'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email.'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Please enter your password.'],
        minlength: [6, 'Your password should be atleast 6 characters.'],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            requied: true
        },
        url: {
            type: String,
            requied: true
        }
    },
    role: {
        type: String,
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

// Encypting passwords before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

// Compare user password in database password
userSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
};

// Return JSON Web Token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });
};

// Generate Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model('User', userSchema);