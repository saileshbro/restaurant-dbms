const signupController = require('../controllers/signupController');
const router = require('express').Router;
router.post('/signup/customer', signupController.createCustomer);
router.post("/signup/manager", signupController.createManager);
module.exports = router;
