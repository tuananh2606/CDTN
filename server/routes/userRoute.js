const router = require('express').Router();
const {
    getAllUsers,
    deleteUser,
    getUser,
    updateUser,
    createUser,
    searchUsers,
} = require('../controllers/userController');
const middlewareAuth = require('../middlewares/auth');

router.get('/', middlewareAuth.isAuthenticatedUser, middlewareAuth.authorizeRoles, getAllUsers);
router.get('/search', middlewareAuth.isAuthenticatedUser, middlewareAuth.authorizeRoles, searchUsers);
router.get('/:id', middlewareAuth.isAuthenticatedUser, getUser);
router.post('/', middlewareAuth.isAuthenticatedUser, middlewareAuth.authorizeRoles, createUser);
router.delete('/:id', middlewareAuth.authorizeRoles, middlewareAuth.authorizeRoles, deleteUser);
router.put('/:id', middlewareAuth.authorizeRoles, middlewareAuth.authorizeRoles, updateUser);

module.exports = router;
