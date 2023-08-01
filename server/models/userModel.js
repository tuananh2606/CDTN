const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Joi = require('joi');
const userSchema = new mongoose.Schema(
    {
        googleId: {
            type: String,
            default: null,
        },
        firstName: {
            type: String,
            require: true,
        },
        lastName: {
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

const User = mongoose.model('User', userSchema);

const validate = (user) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string()
            .pattern(
                new RegExp(
                    '(?=[A-Za-z0-9!#$&()*+,-.:;<=>?%@[^_{|}~]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#$&()*+,-.:;<=>%?@[^_{|}~])(?=.{8,19}).*$',
                ),
            )
            .required()
            .min(8)
            .max(20),
    });
    return schema.validate(user);
};

module.exports = { User, validate };
