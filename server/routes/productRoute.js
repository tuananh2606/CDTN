const router = require('express').Router();
const { createProduct, getAllProducts, getProductsByCategory } = require('../controllers/productController');

// router.get('/', getAllProducts);
router.post('/', createProduct);
router.get('/', getProductsByCategory);

module.exports = router;
