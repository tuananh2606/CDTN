const Product = require('../models/productModel');

// Get All Products
exports.getAllProducts = async (req, res) => {
        try {
                const products = await Product.find();
                res.status(200).json(products);
        } catch (error) {
                res.status(500).json(error) 
        }
};
//Create new product
exports.createProduct = async(req, res) => {
        try {
               const newProduct = new Product(req.body);
               const savedProduct = await newProduct.save();
               res.status(200).json(savedProduct)
        } catch (error) {
                res.status(500).json(error)
        }
}

