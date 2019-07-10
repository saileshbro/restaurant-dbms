const pool = require("../database/database");
module.exports.getFoods = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM food_item");
    if (!results) {
      return res.status(404).json({ error: "Unexpected error" });
    }
    return res.send({ foods: results });
  } catch (error) {
    return res.send({ error: "Internal server error." });
  }
};
