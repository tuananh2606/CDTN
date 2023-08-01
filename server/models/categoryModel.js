const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
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
        videos: {
            desktop_tablet: [
                {
                    public_id: String,
                    url: String,
                },
            ],
            mobile: [
                {
                    public_id: String,
                    url: String,
                },
            ],
        },

        images: [
            {
                public_id: String,
                url: String,
            },
        ],
    },
    { timestamps: true },
);

module.exports = mongoose.model('Category', categorySchema);
