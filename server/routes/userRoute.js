const router = require('express').Router();
const {
    getAllUsers,
    deleteUser,
    getUser,
    updateUser,
    createUser,
    searchUsers,
    changePassword,
    editProfile,
} = require('../controllers/userController');
const middlewareAuth = require('../middlewares/auth');

router.get('/', middlewareAuth.isAuthenticatedUser, middlewareAuth.authorizeRoles, getAllUsers);
router.get('/search', middlewareAuth.isAuthenticatedUser, middlewareAuth.authorizeRoles, searchUsers);
router.get('/:id', middlewareAuth.isAuthenticatedUser, getUser);
router.post('/', middlewareAuth.isAuthenticatedUser, middlewareAuth.authorizeRoles, createUser);
router.delete('/:id', middlewareAuth.isAuthenticatedUser, middlewareAuth.authorizeRoles, deleteUser);
router.put('/edit-profile', middlewareAuth.isAuthenticatedUser, editProfile);
router.put('/:id', middlewareAuth.isAuthenticatedUser, middlewareAuth.authorizeRoles, updateUser);
router.post('/change-password', middlewareAuth.isAuthenticatedUser, changePassword);

module.exports = router;
