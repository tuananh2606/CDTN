const router = require('express').Router();
const {
    getAllOrders,
    createOrder,
    deleteOrder,
    createPaymentVnPay,
    vnpayIpn,
    vnPayReturn,
    updateOrderStatusVnPay,
    getOrder,
    updateOrder,
    getOrderByOrderId,
    getOrderByUser,
} = require('../controllers/orderController');
const middlewareAuth = require('../middlewares/auth');

router.get('/', getAllOrders);
router.post('/vnpay_ipn', vnpayIpn);
router.get('/vnpay_return', vnPayReturn);
router.get('/:id', getOrder);
router.get('/orderId/:id', getOrderByOrderId);
router.get('/user/:id', getOrderByUser);

router.post('/', middlewareAuth.isAuthenticatedUser, createOrder);
router.put('/:id', middlewareAuth.isAuthenticatedUser, updateOrder);
router.delete('/:id', middlewareAuth.isAuthenticatedUser, middlewareAuth.authorizeRoles, deleteOrder);
router.put('/vnpay/:orderId', updateOrderStatusVnPay);
router.post('/payment-vnpay', createPaymentVnPay);

// router.put('/:id', updateCategory);
// router.delete('/:id', deleteCategory);

module.exports = router;
