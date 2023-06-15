const router = require('express').Router();
const {
    registerUser,
    userLogin,
    requestRefreshToken,
    userLogout,
    userloginWithGoogle,
} = require('../controllers/authController');
const middlewareAuth = require('../middlewares/auth');

router.post('/register', registerUser);
router.post('/login', userLogin);
router.post('/refresh', requestRefreshToken);
router.post('/logout', userLogout);
router.post('/google', userloginWithGoogle);

module.exports = router;
