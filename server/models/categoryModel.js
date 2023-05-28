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
        videos: {
            desktop_tablet: [
                {
                    name: String,
                    url: String,
                },
            ],
            mobile: [
                {
                    name: String,
                    url: String,
                },
            ],
        },

        images: [
            {
                name: String,
                url: String,
            },
        ],
    },
    { timestamps: true },
);

module.exports = mongoose.model('Category', categorySchema);
