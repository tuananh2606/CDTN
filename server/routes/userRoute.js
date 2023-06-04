const router = require('express').Router();
const { getAllUsers, deleteUser, getUser, updateUser } = require('../controllers/userController');
const middlewareAuth = require('../middlewares/auth');

router.get('/', middlewareAuth.isAuthenticatedUser, getAllUsers);
router.get('/:id', middlewareAuth.isAuthenticatedUser, getUser);
router.delete('/:id', middlewareAuth.authorizeRoles, deleteUser);
router.put('/:id', middlewareAuth.authorizeRoles, updateUser);

module.exports = router;
