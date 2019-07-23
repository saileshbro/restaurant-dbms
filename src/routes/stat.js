const router = require("express").Router();
const statController = require("../controllers/statController");
router.get("/stats/import", statController.getImportStats);
router.get("/stats/import/good", statController.getImportStatsByImportGood);
router.get("/stats/import/type", statController.getImportStatsByImportType);
router.get("/stats/bill", statController.getBillStats);
router.get("/stats/report", statController.getSalesReport);
module.exports = router;
