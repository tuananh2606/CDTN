const Product = require('../models/productModel');
const Category = require('../models/categoryModel');
const slugify = require('slugify');
const cloudinary = require('../cloudinary');
const { uploadFiles } = require('../utils/uploadFiles');

// Get All Products
exports.getAllProducts = async (req, res) => {
    try {
        let page = req.query.page || 1;
        let perPage = parseInt(req.query.limit) || 10;

        const products = await Product.find()
            .populate({ path: 'category', select: { _id: 1, name: 1 } })
            .sort({ createdAt: -1 });
        const totalDocuments = await Product.find().countDocuments();

        // .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
        // .limit(perPage);
        const newProduct = { products: products, count: totalDocuments };
        return res.status(200).json(newProduct);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getLatestProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate({
                path: 'category',
                select: { _id: 1, slug: 1 },
            })
            .sort({ $natural: 1 })
            .limit(3);
        return res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
};

// exports.getProductsByCategory = async (req, res) => {
//     try {
//         let page = req.query.page || 1;
//         const limit = parseInt(req.query.limit) || 12;
//         const { _id } = await Category.findOne({ slug: req.query.category });
//         const products = await Product.find({ category: _id })
//             .populate('category')
//             .skip((page - 1) * limit)
//             .limit(limit)
//             .exec();
//         const count = await Product.find({ category: _id }).countDocuments();
//       return res.status(200).json({ total_count: count, products: products });
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };
//Get All Product By Category
exports.getProductsByCategory = async (req, res, next) => {
    try {
        let page = req.query.page || 1;
        let perPage = parseInt(req.query.limit) || 4;
        const { _id } = await Category.findOne({ slug: req.query.category });
        const products = await Product.find({ category: _id })
            .populate('category')
            .skip(perPage * page - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
            .limit(perPage)
            .exec();
        const totalDocuments = await Product.find({ category: _id }).countDocuments();
        const totalPage = Math.ceil(totalDocuments / perPage);
        return res.status(200).json({ total_count: totalDocuments, total_pages: totalPage, products: products });
    } catch (error) {
        res.status(500).json(error);
    }
};

//Get product details
exports.getProductDetails = async (req, res) => {
    const product = await Product.findOne({ code: req.params.code }).populate({
        path: 'category',
        select: { _id: 1, slug: 1 },
    });
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

exports.searchProducts = async (req, res) => {
    try {
        const searchQuery = req.query.q;
        const products = await Product.find(
            {
                $text: {
                    $search: searchQuery,
                    $caseSensitive: false,
                    $diacriticSensitive: false,
                },
            },
            { score: { $meta: 'textScore' } },
        )
            // .collation({ locale: 'en_US', strength: 1 })
            .populate({
                path: 'category',
                select: { _id: 1, slug: 1 },
            })
            .limit(10)
            .sort({ score: { $meta: 'textScore' } });
        res.status(200).json(products);
    } catch (error) {
        return res.status(500).json(error);
    }
};

exports.filterProducts = async (req, res) => {
    try {
        const { gte, lte, category } = req.body;
        let { _id } = await Category.findOne({ slug: category });
        if (!_id) {
            return res.status(404).json({ error: 'Category not found' });
        }
        let condition = {};
        if (_id) {
            condition.category = _id;
        }
        if (gte) {
            condition.price = {
                $gte: Number(gte),
            };
        }
        if (lte) {
            condition.price = { $lte: Number(lte) };
        }
        const product = await Product.find(condition);

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json(error);
    }
};
