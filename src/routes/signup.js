const signupController = require("../controllers/signupController");
const { contactValidator } = require("../middlewares/contactvalidator");
const { credentialsValidator } = require("../middlewares/credentialvalidator");
const router = require("express").Router();
router.post(
  "/signup/customer",
  credentialsValidator,
  contactValidator,
  signupController.createCustomer
);
router.post(
  "/signup/manager",
  credentialsValidator,
  contactValidator,
  signupController.createManager
);
module.exports = router;
