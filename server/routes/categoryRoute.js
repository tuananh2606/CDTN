const router = require('express').Router();
const { createCategory, getAllCategories, getCategory } = require('../controllers/categoryController');

router.get('/', getAllCategories);
router.get('/:slug', getCategory);
router.post('/', createCategory);

module.exports = router;
