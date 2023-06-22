const slugify = require('slugify');
const Order = require('../models/orderModel');
const Category = require('../models/categoryModel');
const Product = require('../models/productModel');

// Get All Orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        return res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Get Order
exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        return res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error);
    }
};

//Create category
exports.createOrder = async (req, res) => {
    try {
        const product = await Product.findOne({ code: 'M23013' }).populate('category').exec();
        console.log(product.category);
        res.status(200).json('sucess');
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const newCategoryData = {
            name: req.body.name,
            slug: slugify(req.body.name),
            videos: req.body.videos,
            images: req.body.images,
        };
        await Category.findByIdAndUpdate(req.params.id, newCategoryData, { new: true, runValidators: true });
        return res.status(200).json({ success: 'Update Successfully!' });
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        await cloudinary.deleteFolder(`Videos/${req.body.name}`, { resource_type: 'video' });
        await cloudinary.deleteFolder(`Images/${req.body.name}`);
        await Category.findByIdAndDelete(req.params.id);
        return res.status(200).json('Delete Successfully!');
    } catch (error) {
        return res.status(500).json(error);
    }
};
