const router = require('express').Router();
const { createProduct, getAllProducts, getAllProductsByCategory } = require('../controllers/productController');

router.get('/', getAllProducts);
router.post('/', createProduct);
// router.get('/:category', getAllProductsByCategory);

module.exports = router;
