const mongoose = require('mongoose');
const { isEmail } = require('validator');
const userSchema = new mongoose.Schema(
    {
        googleId: {
            type: String,
            default: null,
        },
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
            validate: [isEmail, 'Please enter a valid email'],
        },
        password: {
            type: String,
            required: true,
            minLength: [8, 'Password should have at least 8 chars'],
        },
        admin: {
            type: Boolean,
            default: false,
        },
        verified: {
            type: String,
            default: 'Inactive',
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
