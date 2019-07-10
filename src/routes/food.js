const router = require("express").Router();
const foodController = require("../controllers/foodController");
router.get("/foods", foodController.getFoods);
router.post("/foods", foodController.addFood);
router.get(
  "/foods/category/:food_category_id",
  foodController.getFoodsByCategory
);
router.patch("/food/:food_item_id", foodController.updateFoodItem);
router.delete("/food/:food_item_id", foodController.deleteFoodItem);
module.exports = router;
