const Category = require('../models/categoryModel');
const slugify = require('slugify');

// Get All Category
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json({ success: true, categories });
    } catch (error) {
        res.status(500).json(error);
    }
};
//Create category
exports.createCategory = async (req, res) => {
    try {
        const categoryObj = {
            name: req.body.name,
            slug: slugify(req.body.name),
            videos: req.body.videos,
            images: req.body.images,
        };

        // if (req.body.parentId) {
        //     categoryObj.parentId = req.body.parentId;
        // }
        const cat = new Category(categoryObj);
        const savedCat = await cat.save();
        res.status(200).json(savedCat);
    } catch (error) {
        res.status(500).json(error);
    }
};

// function createCategories(categories, parentId = null) {
//     const categoryList = [];
//     let category;
//     if (parentId == null) {
//         category = categories.filter((cat) => cat.parent_id == null);
//     } else {
//         category = categories.filter((cat) => String(cat.parent_id) == String(parentId));
//     }

//     for (let cate of category) {
//         categoryList.push({
//             _id: cate._id,
//             name: cate.name,
//             slug: cate.slug,
//             children: createCategories(categories, cate._id),
//         });
//     }
//     return categoryList;
// }
