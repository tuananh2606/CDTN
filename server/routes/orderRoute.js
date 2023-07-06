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
} = require('../controllers/orderController');
const middlewareAuth = require('../middlewares/auth');

router.get('/', getAllOrders);
router.post('/vnpay_ipn', vnpayIpn);
router.get('/vnpay_return', vnPayReturn);
router.get('/:id', getOrderDetails);
router.post('/', middlewareAuth.isAuthenticatedUser, middlewareAuth.authorizeRoles, createOrder);
router.delete('/:id', middlewareAuth.isAuthenticatedUser, middlewareAuth.authorizeRoles, deleteOrder);
router.put('/vnpay/:orderId', updateOrderStatusVnPay);
router.post('/payment-vnpay', createPaymentVnPay);

// router.put('/:id', updateCategory);
// router.delete('/:id', deleteCategory);

module.exports = router;
