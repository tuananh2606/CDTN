const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            lowercase: true,
            trim: true,
        },
        code: {
            type: String,
            required: true,
            unique: true,
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
                public_id: String,
                url: String,
            },
        ],
        price: {
            type: Number,
            required: true,
        },
        category: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category', required: true },
        // category: {
        //     type: String,
        //     required: true,
        // },
        stock: {
            type: Number,
            required: [true, 'Please enter product stock'],
            default: 1,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Product', productSchema);
