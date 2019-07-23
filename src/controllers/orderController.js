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
  const { completed } = req.query;
  try {
    const orderIds = await pool.query(
      "SELECT DISTINCT order_id,order_time,table_no from order_item inner join order_relates_table using (order_id) inner join food_order using(order_id) WHERE is_order_complete=?",
      [completed || 0]
    );
    const toSend = [];
    for (let i = 0; i < orderIds.length; i++) {
      let { order_time, table_no } = orderIds[i];
      const result = await pool.query(
        "SELECT itm.food_item_name,COALESCE(itm.quantity,1) AS quantity FROM food_order AS ord INNER JOIN order_relates_table AS tbl ON ord.order_id = tbl.order_id INNER JOIN order_item AS itm ON itm.order_id=ord.order_id where ord.order_id=?",
        [orderIds[i].order_id]
      );
      toSend.push({ order_time, table_no, orders: result });
    }
    const homeOrderIds = await pool.query(
      "SELECT DISTINCT order_id,order_time,home_delivery_no from order_item inner join order_relates_home_delivery using (order_id) inner join food_order using(order_id) WHERE is_order_complete=?",
      [completed || 0]
    );
    for (let i = 0; i < homeOrderIds.length; i++) {
      let { order_time, home_delivery_no } = homeOrderIds[i];
      const result = await pool.query(
        "SELECT itm.food_item_name,COALESCE(itm.quantity,1) AS quantity FROM food_order AS ord INNER JOIN order_relates_home_delivery AS tbl ON ord.order_id = tbl.order_id INNER JOIN order_item AS itm ON itm.order_id=ord.order_id where ord.order_id=?",
        [homeOrderIds[i].order_id]
      );
      toSend.push({ order_time, home_delivery_no, orders: result });
    }
    return res.send({ orders: toSend });
  } catch (error) {
    return res.status(500).send({ error });
  }
};
exports.createTableOrder = async (req, res) => {
  const table_no = req.params.table_no;
  const staff_id = req.params.staff_id;
  const { order_items } = req.body;
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
exports.completeAOrder = async (req, res) => {
  const { order_id } = req.params;
  try {
    const result = await pool.query(
      "UPDATE food_order SET is_order_complete=? WHERE order_id=?",
      [1, order_id]
    );
    if (result.affectedRows == 1) {
      return res.send({ message: "Order completed" });
    }
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" });
  }
};
exports.getTableOrders = async (req, res) => {
  const { table_no } = req.params;
  const { completed } = req.query;
  try {
    const orderIds = await pool.query(
      "SELECT DISTINCT order_id,order_time,table_no from order_item inner join order_relates_table using (order_id) inner join food_order using(order_id) WHERE is_order_complete=? AND table_no=?",
      [completed || 0, table_no]
    );
    const toSend = [];
    for (let i = 0; i < orderIds.length; i++) {
      let { order_time, table_no } = orderIds[i];
      const result = await pool.query(
        "SELECT itm.food_item_name,COALESCE(itm.quantity,1) AS quantity FROM food_order AS ord INNER JOIN order_relates_table AS tbl ON ord.order_id = tbl.order_id INNER JOIN order_item AS itm ON itm.order_id=ord.order_id where ord.order_id=?",
        [orderIds[i].order_id]
      );
      toSend.push({ order_time, table_no, orders: result });
    }
    return res.send({ orders: toSend });
  } catch (error) {
    return res.status(500).send({ error: "Internal server error" });
  }
};
// is_order_complete halne############
// completion anusar order haru herne#################
// order ko completion change garne###################
// order ko bill issue garne
// eauta table ko orders herne############
// eauta staff ko orders herne
// eauta customer ko herne
// homedelivery ko place gerne
// time anusar order nikalne
// order ko bill banaune
// home delivery ko ni bill banaune
// eauta kunai order ma aaru items halney
// isfoodavailable change garne menu bata

// get total bill amounts date anusar
// get total items sold date anusar
// get total profit date anusar
// kk besi sell vaira cha tyo
