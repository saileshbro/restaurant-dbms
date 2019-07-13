const router = require("express").Router();
const loginController = require("../controllers/loginController");
router.post("/login/user", loginController.loginUser);
router.post("/login/restaurant", loginController.restaurantLogin);
module.exports = router;
