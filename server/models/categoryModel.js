const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            lowercase: true,
            required: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        video: {
            type: String,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Category', categorySchema);
