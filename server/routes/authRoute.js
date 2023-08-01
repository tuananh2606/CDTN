const router = require('express').Router();
const {
    registerUser,
    userLogin,
    requestRefreshToken,
    userLogout,
    userloginWithGoogle,
    sendEmailResetPassword,
    passwordReset,
    checkUserExists,
} = require('../controllers/authController');
const middlewareAuth = require('../middlewares/auth');

router.post('/check-email', checkUserExists);
router.post('/register', registerUser);
router.post('/login', userLogin);
router.get('/refresh', requestRefreshToken);
router.post('/logout', userLogout);
router.post('/google', userloginWithGoogle);
router.post('/password-reset', sendEmailResetPassword);
router.post('/password-reset/:userId', passwordReset);

module.exports = router;
