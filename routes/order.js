const express = require('express');
const router = express.Router();
const {protect } = require('../middleware/auth');
const {getOrders, getOrder, getOrderCount, createOrder, updateOrder, deleteOrder } =  require('../controllers/order');

router.route('/count').get(getOrderCount);
router.route('/').get(getOrders).post(protect,createOrder);
router.route('/:id').get(getOrder).put(protect,updateOrder).delete(protect,deleteOrder);

module.exports = router;
