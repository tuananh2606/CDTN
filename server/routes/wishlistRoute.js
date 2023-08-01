const router = require('express').Router();
const middlewareAuth = require('../middlewares/auth');
const {
    addToWishlist,
    removeFromWishlist,
    getWishlist,
    checkExistInWishlist,
} = require('../controllers/wishlistControler');

router.get('/:id', getWishlist);
router.post('/check', checkExistInWishlist);
router.post('/', middlewareAuth.isAuthenticatedUser, addToWishlist);
router.delete('/:id', middlewareAuth.isAuthenticatedUser, removeFromWishlist);

module.exports = router;
