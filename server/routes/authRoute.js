const router = require('express').Router();
const { registerUser, userLogin, requestRefreshToken, userLogout } = require('../controllers/authController');
const middlewareAuth = require('../middlewares/auth');

router.post('/register', registerUser);
router.post('/login', userLogin);
router.post('/refresh', requestRefreshToken);
router.post('/logout', userLogout);

module.exports = router;
