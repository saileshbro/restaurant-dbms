const router = require('express').Router();
const billController = require('../controllers/billController');
router.post('/bill/:bill_no', billController.createBill);
router.get('/bill/:bill_no', billController.getBill);
router.get('/bill/order/:order_id', billController.getBillByOrder);
router.get('/bill/issue_date/:issue_date', billController.getBillByDate);
module.exports = router;