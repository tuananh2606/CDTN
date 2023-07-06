const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: 'User',
        },
        token: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 3600,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Token', tokenSchema);
