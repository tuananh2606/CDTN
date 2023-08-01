const router = require('express').Router();
const {
    getAllOrders,
    getOrderDetails,
    createOrder,
    deleteOrder,
    createPaymentVnPay,
    vnpayIpn,
    vnPayReturn,
    updateOrderStatusVnPay,
    getOrder,
    updateOrder,
} = require('../controllers/orderController');
const middlewareAuth = require('../middlewares/auth');

router.get('/', getAllOrders);
router.post('/vnpay_ipn', vnpayIpn);
router.get('/vnpay_return', vnPayReturn);
router.get('/:id', getOrder);
router.post('/', middlewareAuth.isAuthenticatedUser, middlewareAuth.authorizeRoles, createOrder);
router.put('/:id', middlewareAuth.isAuthenticatedUser, middlewareAuth.authorizeRoles, updateOrder);
router.delete('/:id', middlewareAuth.isAuthenticatedUser, middlewareAuth.authorizeRoles, deleteOrder);
router.put('/vnpay/:orderId', updateOrderStatusVnPay);
router.post('/payment-vnpay', createPaymentVnPay);

// router.put('/:id', updateCategory);
// router.delete('/:id', deleteCategory);

module.exports = router;
