const router = require('express').Router();
const billController = require('../controllers/billController');
router.post('/bill', billController.createBill);
module.exports = router;