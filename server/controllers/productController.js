const Product = require('../models/productModel');

// Get All Products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json(error);
    }
};

//Get All Product By Category
exports.getAllProductsByCategory = async (req, res) => {
    try {
        res.send(req.params.category);
    } catch (error) {}
};

//Get Product Details
// exports.getProductDetails = asyncErrorHandler(async (req, res, next) => {
//     const product = await Product.findById(req.params.id);

//     if (!product) {
//         return next(new ErrorHandler('Product Not Found', 404));
//     }

//     res.status(200).json({
//         success: true,
//         product,
//     });
// });

//Create new product
exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
};
