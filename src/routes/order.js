const router = require("express").Router();
const orderController = require("../controllers/orderController");

router.post(
  "/orders/create/:staff_id/:table_no",
  orderController.createTableOrder
);
router.post("/orders/makecomplete/:order_id", orderController.completeAOrder);
router.get("/orders", orderController.showOrders);
router.get("/orders/table/:table_no", orderController.getTableOrders);
router.delete("/order/:order_id", orderController.deleteOrder);
module.exports = router;
