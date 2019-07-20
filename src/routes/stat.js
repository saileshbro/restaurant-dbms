const router = require("express").Router();
const statController = require("../controllers/statController");
router.get("/stats/import", statController.getImportStats);
module.exports = router;
