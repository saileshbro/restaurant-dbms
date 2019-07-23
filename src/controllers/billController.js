const pool = require('../database/database');
const { generateId } = require("../functions/id");
module.exports.createBill = async (req, res) => {
    const {
        issue_date
    } = req.body;
    const bill_no = generateId("BILL");
    const { order_id } = req.params;
    if (bill_no == 0 || !bill_no || order_id.length == 0 || !order_id) {
        return res.send({ error: "Bill number and order id not provided" });
    }
    try {
        const total_price = await pool.query("SELECT SUM(food_item.food_item_price) as total_price from food_item INNER JOIN order_item ON food_item.food_item_name=order_item.food_item_name where order_item.order_id=?", [order_id]);
        const insertbill = await pool.query(
            `INSERT INTO bill SET bill_no=?,issue_date=?,order_id=?,total_price=?`,
            [bill_no, issue_date, order_id, total_price]
        );
        console.log(insertbill);
        if (insertbill.affectedRows == 1) {
            return res.send({ message: "Bill successfully created." });
        } else {
            return res.status(400).send({ error: "Unable to create bill." });
        }

    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(500).send({
                error: "Bill with given credentials already exists."
            });
        } else {
            return res.status(500).send({ error });
        }
    }
}
