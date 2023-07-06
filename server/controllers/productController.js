const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const slugify = require('slugify');
const cloudinary = require('../cloudinary');
const { uploadFiles } = require('../utils/uploadFiles');

const UpperCaseFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
// Get All Products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getLatestProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({ $natural: 1 }).limit(3);
        return res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
};

//Get All Product By Category
exports.getProductsByCategory = async (req, res) => {
    try {
        const { _id } = await Category.findOne({ slug: req.query.category });
        const products = await Product.find({ category: _id }).populate('category').exec();
        return res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
};

//Get product details
exports.getProductDetails = async (req, res) => {
    const product = await Product.findOne({ code: req.params.code });
    return res.status(200).json({
        success: true,
        product,
    });
};
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json(error);
    }
};

//Upload Media Product

exports.uploadMedia = async (req, res) => {
    try {
        const { name } = await Category.findById(req.body.category);
        const path = `${name}/${req.body.name}`;
        const urls = await uploadFiles(req, res, path);
        res.status(200).json(urls);
    } catch (error) {
        res.status(500).json(error);
    }
};

//Create new product
exports.createNewProduct = async (req, res) => {
    try {
        const productObj = {
            code: req.body.code,
            name: req.body.name,
            slug: slugify(req.body.slug),
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock,
            images: req.body.images,
        };
        const newProduct = new Product(productObj);
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { slug } = req.body;
        const newProductData = {
            ...req.body,
            slug: slugify(slug),
        };
        await Product.findByIdAndUpdate(req.params.id, newProductData, { new: true, runValidators: true });
        return res.status(200).json({ success: 'Update Successfully!' });
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { name } = await Category.findById(req.body.category);
        await cloudinary.deleteFolder(`Images/${name}/${req.body.name}`);
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json('Delete Successfully!');
    } catch (error) {
        return res.status(500).json(error);
    }
};
