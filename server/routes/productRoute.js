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
    getLatestProducts,
    searchProducts,
    filterProducts,
} = require('../controllers/productController');
const middlewareAuth = require('../middlewares/auth');

router.get('/', middlewareAuth.isAuthenticatedUser, middlewareAuth.authorizeRoles, getAllProducts);
router.get('/latest', getLatestProducts);
router.get('/by-category', getProductsByCategory);
router.get('/search', searchProducts);
router.get('/:slug/:code', getProductDetails);
router.get('/:id', getProductById);
router.post('/upload', upload.fields([{ name: 'images', maxCount: 12 }]), uploadMedia);
router.post('/filter', filterProducts);
router.post('/', middlewareAuth.isAuthenticatedUser, middlewareAuth.authorizeRoles, createNewProduct);
router.put('/:id', middlewareAuth.isAuthenticatedUser, middlewareAuth.authorizeRoles, updateProduct);
router.delete('/:id', middlewareAuth.isAuthenticatedUser, middlewareAuth.authorizeRoles, deleteProduct);

module.exports = router;
