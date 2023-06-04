const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const slugify = require('slugify');

// Get All Products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json(error);
    }
};

//Get All Product By Category
exports.getProductsByCategory = async (req, res) => {
    try {
        const { slug } = await Category.findOne({ slug: req.query.category });
        const products = await Product.find({ category: slug });
        return res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json(error);
    }
};

//Get product details
exports.getProductDetails = async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
    return res.status(200).json({
        success: true,
        product,
    });
};

//Create new product
exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product({ ...req.body, slug: slugify(req.body.name) });
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
};
