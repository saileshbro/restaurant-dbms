const router = require("express").Router();
const foodController = require("../controllers/foodController");
router.get("/foods", foodController.getFoods);
module.exports = router;
