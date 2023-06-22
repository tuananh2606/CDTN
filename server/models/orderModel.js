const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        shippingInfo: {
            name: {
                type: String,
                required: true,
            },
            address: [
                {
                    addressLine1: {
                        type: String,
                        required: true,
                    },
                    addressLine2: String,
                },
            ],
            city: {
                type: String,
                required: true,
            },
            district: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
            pincode: {
                type: Number,
            },
            phoneNumber: {
                type: String,
                required: true,
            },
        },
        orderItems: [
            {
                name: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                image: {
                    type: String,
                    required: true,
                },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
            },
        ],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        paymentInfo: {
            status: {
                type: Boolean,
                default: false,
                required: true,
            },
            paymentMethod: {
                type: String,
                required: true,
            },
        },
        paidAt: {
            type: Date,
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        orderStatus: {
            type: String,
            required: true,
            default: 'Processing',
        },
        deliveredAt: Date,
        shippedAt: Date,
    },
    { timestamps: true },
);

module.exports = mongoose.model('Order', orderSchema);
