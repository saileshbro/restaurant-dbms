const router = require('express').Router();
const orderController = require('../controllers/orderController');

router.post('/order_by_staff/:staff_id/:table_no', orderController.addOrder);
router.get('/orders', orderController.showOrders);
router.delete("/order/:order_id", orderController.deleteOrder);
module.exports = router;