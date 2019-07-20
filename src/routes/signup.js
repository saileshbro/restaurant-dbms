const signupController = require("../controllers/signupController");
const { contactValidator } = require("../middlewares/contactvalidator");
const { credentialsValidator } = require("../middlewares/credentialvalidator");
const auth = require("../auth/auth");
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
router.post(
  "/signup/kitchen",
  credentialsValidator,
  contactValidator,
  signupController.createKitchen
);
router.post(
  "/signup/waiter",
  credentialsValidator,
  contactValidator,
  signupController.createWaiter
);
<<<<<<< HEAD
router.get("/signup/all", signupController.getAllSignups);
=======
router.get("/signup/customers", auth, signupController.getAllCustomers);
router.get("/signup/staffs", auth, signupController.getAllStaffs);

>>>>>>> abe73535693fcd7ed346d5f4ced9e85f1bc0a13d
module.exports = router;
