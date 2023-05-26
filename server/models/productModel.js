const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            lowercase: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        images: [
            {
                url: {
                    type: String,
                    required: true,
                },
            },
        ],
        price: {
            type: Number,
            required: [true, 'Please enter product price'],
        },
        category: {
            type: String,
            required: true,
        },
        variation: {
            colors: [
                {
                    name: String,
                    image: String,
                },
            ],
            size: [{ type: Number }],
        },
        stock: {
            type: Number,
            required: [true, 'Please enter product stock'],
            maxlength: [4, 'Stock cannot exceed limit'],
            default: 1,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Product', productSchema);
