const router = require("express").Router();
const orderController = require("../controllers/orderController");

router.post(
  "/orders/create/:staff_id/:table_no",
  orderController.createTableOrder
);
router.get("/orders", orderController.showOrders);
router.delete("/order/:order_id", orderController.deleteOrder);
module.exports = router;
