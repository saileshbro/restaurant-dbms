const router = require("express").Router();
const orderController = require("../controllers/orderController");

router.post(
  "/orders/create/:staff_id/:table_no",
  orderController.createTableOrder
);
router.post("/orders/makecomplete/:order_id", orderController.completeAOrder);
router.post("/orders/homeDelivery/:customer_id", orderController.placeHomeDelivery);
router.patch("/orders/homeDelivery/assignStaff/:home_delivery_id", orderController.assignDeliveryStaff);
router.patch("/orders/homeDelivery/updateDeliveryStatus/:home_delivery_id", orderController.updateDeliveryStatus);
router.get("/orders", orderController.showOrders);
router.get("/orders/table/:table_no", orderController.getTableOrders);
router.delete("/order/:order_id", orderController.deleteOrder);
module.exports = router;
