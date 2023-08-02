const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
        },
        shippingInfo: {
            name: {
                type: String,
                required: true,
            },
            address: {
                addressLine1: {
                    type: String,
                    required: true,
                },
                addressLine2: String,
            },
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
        orderItems: {
            type: Array,
        },
        user: {
            type: mongoose.SchemaTypes.ObjectId,
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
            default: Date.now(),
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
            default: 'Placed',
        },
        deliveredAt: Date,
        shippedAt: Date,
    },
    { timestamps: true },
);
module.exports = mongoose.model('Order', orderSchema);
