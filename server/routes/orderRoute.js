const router = require('express').Router();
const { getAllOrders, getOrder, createOrder } = require('../controllers/orderController');

router.get('/', getAllOrders);
router.get('/:id', getOrder);
router.post('/', createOrder);
// router.put('/:id', updateCategory);
// router.delete('/:id', deleteCategory);

module.exports = router;
