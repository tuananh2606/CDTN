const router = require('express').Router();
const {
    registerUser,
    userLogin,
    requestRefreshToken,
    userLogout,
    userloginWithGoogle,
    sendEmailResetPassword,
    passwordReset,
} = require('../controllers/authController');
const middlewareAuth = require('../middlewares/auth');

router.post('/register', registerUser);
router.post('/login', userLogin);
router.post('/refresh', requestRefreshToken);
router.post('/logout', userLogout);
router.post('/google', userloginWithGoogle);
router.post('/password-reset', sendEmailResetPassword);
router.post('/password-reset/:userId', passwordReset);

module.exports = router;
