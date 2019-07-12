const signupController = require('../controllers/signupController');
const router = require('express').Router;
router.post('/signup/customer', signupController.createCustomer);
module.exports = router;