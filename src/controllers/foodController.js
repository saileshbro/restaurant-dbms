const pool = require("../database/database");
module.exports.getFoods = async (req, res) => {
  try {
    const results = await pool.query(
      `SELECT food_item_id,name,price,food_category_id,food_category_name
      FROM food_item 
      INNER JOIN food_category 
      USING(food_category_id) ORDER BY name`
    );
    if (!results) {
      return res.status(404).json({ error: "Unexpected error" });
    }
    return res.send({ food_items: results });
  } catch (error) {
    return res.send({ error: "Internal server error." });
  }
};
module.exports.addFood = async (req, res) => {
  const { name, price, category } = req.body;
  try {
    if (!name || name.length == 0) {
      return res
        .status(403)
        .send({ error: "Cannot add food item without name" });
    } else if (!price) {
      return res
        .status(403)
        .send({ error: "Cannot add food item without price." });
    } else if (
      !category ||
      !category.food_category_id ||
      !category.food_category_name ||
      category.food_category_name.length == 0
    ) {
      return res
        .status(403)
        .send({ error: "Cannot add food item without category" });
    } else {
      const insert = await pool.query(
        "INSERT INTO food_item SET name=?,price=?,food_category_id=?",
        [name, price, category.food_category_id]
      );
      if (insert.affectedRows == 1) {
        return res.send({ message: "Successfully added." });
      } else {
        return res.status(400).send({ error: "Unable to add a food." });
      }
    }
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY")
      return res.status(500).send({ error: `${name} already exists.` });
    else return res.status(500).send({ error: "Internal server error." });
  }
};
module.exports.getFoodsByCategory = async (req, res) => {
  const food_category_id = req.params.food_category_id;
  try {
    const results = await pool.query(
      `SELECT f.food_item_id,f.name,f.price,cat.food_category_id,cat.food_category_name
      FROM food_item AS f 
      JOIN food_category AS cat 
      ON f.food_category_id= cat.food_category_id
      where cat.food_category_id=? 
      ORDER BY f.name
    `,
      [food_category_id]
    );
    if (!results) {
      return res.status(404).send({ error: "Unexpected error." });
    } else {
      return res.send({ food_items: results });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};
module.exports.updateFoodItem = async (req, res) => {
  const { name, price, category } = req.body;
  const { food_item_id } = req.params;
  try {
    if (!food_item_id) {
      return res.status(403).send({ error: "Cannot update post." });
    } else if (!name || name.length == 0) {
      return res
        .status(403)
        .send({ error: "Cannot update food item without name" });
    } else if (!price) {
      return res
        .status(403)
        .send({ error: "Cannot update food item without price." });
    } else if (
      !category ||
      !category.food_category_id ||
      !category.food_category_name ||
      category.food_category_name.length == 0
    ) {
      return res.status(403).send({
        error: "Cannot update food item without category"
      });
    } else {
      const update = await pool.query(
        "UPDATE food_item SET name=?,price=?,food_category_id=? WHERE food_item_id=?",
        [name, price, category.food_category_id, food_item_id]
      );
      if (update.affectedRows == 1) {
        return res.send({ message: "Successfully updated." });
      } else {
        return res.status(400).send({ error: "Unable to update a food." });
      }
    }
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY")
      return res.status(500).send({ error: `${name} already exists.` });
    else return res.status(500).send({ error: "Internal server error." });
  }
};
module.exports.deleteFoodItem = async (req, res) => {
  const { food_item_id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM food_item WHERE food_item_id=?",
      [food_item_id]
    );
    if (result.affectedRows == 1) {
      return res.send({ message: "Successfully deleted." });
    }
  } catch (error) {
    return res.status(500).send({ error: "Internal Server error" });
  }
};
