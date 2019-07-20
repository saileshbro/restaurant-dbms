const pool = require('../database/database');

module.exports.addOrder = async (req, res) => {
    try {
        var staffId = req.params.staff_id;
        var tableNo = req.params.table_no;

        var order_time = Date.now();
        var order_id = order_time + 'T' + tableNo;

        const insert = await pool.query(
            "INSERT INTO food_order SET order_id=?,order_time=?",
            [order_id, order_time]
        );

        if (insert.affectedRows == 1) {
            req.body.foods.forEach(element => {
                const insert = pool.query(
                    "INSERT INTO order_item SET order_id=?,food_item_name=?, quantity=?",
                    [order_id, element.food_item_name, element.quantity]
                );

                if (insert.affectedRows == 1) {
                    const insert = pool.query(
                        "INSERT INTO order_relates_staff SET order_id=?,staff_id=?",
                        [order_id, staffId]
                    );

                    if (insert.affectedRows == 1) {
                        const insert = pool.query(
                            "INSERT INTO order_relates_table SET order_id=?,table_no=?",
                            [order_id, tableNo]
                        );
                    }

                    res.send({ message: "Successfully ordered." });
                }
                else res.status(400).send({ error: "Unable to order food." });

            });

            //  return res.send({ message: "Successfully ordered." });
        } else {
            return res.status(400).send({ error: "Unable to order food." });
        }

    } catch (error) {
        return res.status(500).send({ error: 'Internal Server error' })
    }
}



module.exports.deleteOrder = async (req, res) => {
    const { order_id } = req.params;
    try {
        const result = await pool.query(
            "DELETE FROM food_order WHERE order_id=?",
            [order_id]
        );
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