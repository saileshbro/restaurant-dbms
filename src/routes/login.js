const router = require("express").Router();
const loginController = require("../controllers/loginController");
const { credentialsValidator } = require("../middlewares/credentialvalidator");
router.post("/login/user", credentialsValidator, loginController.loginUser);
router.post(
  "/login/restaurant",
  credentialsValidator,
  loginController.restaurantLogin
);
module.exports = router;
