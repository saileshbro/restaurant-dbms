const pool = require("../database/database");
const { generateId } = require("../functions/id");
module.exports.deleteOrder = async (req, res) => {
  const { order_id } = req.params;
  try {
    const result = await pool.query("DELETE FROM food_order WHERE order_id=?", [
      order_id
    ]);
    if (result.affectedRows == 1) {
      return res.send({ message: "Successfully deleted." });
    }
  } catch (error) {
    return res.status(500).send({ error: "Internal Server error" });
  }
};
module.exports.showOrders = async (req, res) => {
  try {
    const results = await pool.query(
      `SELECT order_id, order_time FROM food_order INNER JOIN `
    );
    if (!results) {
      return res.status(404).json({ error: "Unexpected error" });
    }
    return res.send({ food_items: results });
  } catch (error) {
    return res.send({ error: "Internal server error." });
  }
};
exports.createTableOrder = async (req, res) => {
  console.log("hit");
  const table_no = req.params.table_no;
  const staff_id = req.params.staff_id;
  const { order_items } = req.body;
  console.log(order_items);
  const order_id = generateId("ORD");
  try {
    const insertFoodOrder = await pool.query(
      "INSERT INTO food_order SET order_id=?",
      [order_id]
    );
    console.log(insertFoodOrder);
    if (insertFoodOrder.affectedRows == 1) {
      const insert_staff = await pool.query(
        `INSERT INTO order_relates_staff SET order_id=?,staff_id=?`,
        [order_id, staff_id]
      );
      const insert_table = await pool.query(
        "INSERT INTO order_relates_table SET order_id=?,table_no=?",
        [order_id, table_no]
      );
      if (insert_staff.affectedRows == 1 && insert_table.affectedRows == 1) {
        console.log("hit");
        for (let i = 0; i < order_items.length; i++) {
          console.log(order_items[i]);
          const insert = await pool.query(
            "INSERT INTO order_item SET order_id=?,food_item_name=?,quantity=?",
            [order_id, order_items[i].food_item_name, order_items[i].quantity]
          );
          console.log(insert);
        }
      }
      return res.send({ message: "Order placed" });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};
