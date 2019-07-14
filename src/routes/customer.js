const router = require("express").Router();
const customerController = require("../controllers/customerController");
router.get("/customer/:user_id/profile", customerController.getCustomerProfile);
module.exports = router;
