const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
    {
        product: { type: mongoose.SchemaTypes.ObjectId, ref: 'Product', required: true },
        user: { type: mongoose.SchemaTypes.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true },
);

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

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

module.exports = { Wishlist, validate };
