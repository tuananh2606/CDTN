const router = require('express').Router();
const { getAllUsers, deleteUser } = require('../controllers/userController');
const middlewareAuth = require('../middlewares/auth');

router.get('/', middlewareAuth.isAuthenticatedUser, getAllUsers);
router.delete('/:id', middlewareAuth.authorizeRoles, deleteUser);

module.exports = router;
