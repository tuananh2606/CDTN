const slugify = require('slugify');
const Category = require('../models/categoryModel');
const cloudinary = require('../cloudinary');
const fs = require('fs');
// ADMIN DASHBOARD

const uploadFiles = async (req, res) => {
    const uploader = async (path, folder) => await cloudinary.uploads(path, folder);
    const urls = { images: [], videos: { desktop_tablet: [], mobile: [] } };
    const imageFiles = req.files.images !== undefined && req.files.images;
    const videosFiles = req.files.videos !== undefined && req.files.videos;

    console.log(req.body);

    if (videosFiles) {
        for (const file of videosFiles) {
            const { path, filename } = file;
            const newPath = await uploader(path, `Videos/${req.body.name}`);
            if (filename.includes('mobile')) {
                urls.videos.mobile.push(newPath);
            } else {
                urls.videos.desktop_tablet.push(newPath);
            }
            fs.unlinkSync(path);
        }
    }
    if (imageFiles) {
        for (const file of imageFiles) {
            const { path } = file;
            const newPath = await uploader(path, `Images/${req.body.name}`);
            urls.images.push(newPath);
            fs.unlinkSync(path);
        }
    }
    return urls;
};

exports.uploadMedia = async (req, res) => {
    try {
        const urls = await uploadFiles(req, res);
        res.status(200).json(urls);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Get All Categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Get Category
exports.getCategory = async (req, res) => {
    try {
        const categories = await Category.findOne({ slug: req.params.slug }).exec();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json(error);
    }
};
exports.getCategoryById = async (req, res) => {
    try {
        const categories = await Category.findById(req.params.id);
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json(error);
    }
};

//Create category
exports.createCategory = async (req, res) => {
    try {
        console.log(req.body);
        const categoryObj = {
            name: req.body.name,
            slug: slugify(req.body.name),
            videos: req.body.videos,
            images: req.body.images,
        };

        const cat = new Category(categoryObj);
        const savedCat = await cat.save();
        res.status(200).json(savedCat);
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
