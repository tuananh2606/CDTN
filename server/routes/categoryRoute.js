const router = require('express').Router();
const { createCategory, getAllCategories } = require('../controllers/categoryController');

router.get('/', getAllCategories);
router.post('/', createCategory);

module.exports = router;
