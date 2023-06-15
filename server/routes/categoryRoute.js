const router = require('express').Router();
const { upload } = require('../server');
const {
    createCategory,
    getAllCategories,
    getCategory,
    uploadMedia,
    deleteCategory,
    getCategoryById,
    updateCategory,
} = require('../controllers/categoryController');

router.get('/', getAllCategories);
router.get('/:slug', getCategory);
router.get('/update/:id', getCategoryById);
router.post(
    '/upload',
    upload.fields([
        { name: 'images', maxCount: 12 },
        { name: 'videos', maxCount: 12 },
    ]),
    uploadMedia,
);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
