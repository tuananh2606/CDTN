const router = require('express').Router();
const {
    createProduct,
    getAllProducts,
    getProductsByCategory,
    getProductDetails,
} = require('../controllers/productController');

// router.get('/', getAllProducts);
router.post('/', createProduct);
router.get('/', getProductsByCategory);
router.get('/:slug', getProductDetails);

module.exports = router;
