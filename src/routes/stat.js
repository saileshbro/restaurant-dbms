const router = require("express").Router();
const statController = require("../controllers/statController");
router.get("/stats/import", statController.getImportStats);
router.get("/stats/import/good", statController.getImportStatsByImportGood);
router.get("/stats/import/type", statController.getImportStatsByImportType);
module.exports = router;
