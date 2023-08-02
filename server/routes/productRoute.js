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
} = require('../controllers/productController');
const middlewareAuth = require('../middlewares/auth');

router.get('/', middlewareAuth.isAuthenticatedUser, middlewareAuth.authorizeRoles, getAllProducts);
router.get('/latest', getLatestProducts);
router.get('/by-category', getProductsByCategory);
router.get('/:slug/:code', getProductDetails);
router.post('/upload', upload.fields([{ name: 'images', maxCount: 12 }]), uploadMedia);
router.get('/:id', getProductById);

router.post('/', middlewareAuth.isAuthenticatedUser, middlewareAuth.authorizeRoles, createNewProduct);
router.put('/:id', middlewareAuth.isAuthenticatedUser, middlewareAuth.authorizeRoles, updateProduct);
router.delete('/:id', middlewareAuth.isAuthenticatedUser, middlewareAuth.authorizeRoles, deleteProduct);
router.post('/search', searchProducts);



module.exports = router;
