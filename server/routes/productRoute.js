const router = require('express').Router();
const { upload } = require('../server');
const {
    createNewProduct,
    getAllProducts,
    getProductsByCategory,
    getProductDetails,
    uploadMedia,
    getProductById,
    deleteProduct,
    updateProduct,
} = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/', getProductsByCategory);
router.get('/:slug/:code', getProductDetails);
router.post('/upload', upload.fields([{ name: 'images', maxCount: 12 }]), uploadMedia);
router.get('/:id', getProductById);

router.post('/', createNewProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
