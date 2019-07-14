const pool = require("../database/database");
exports.getCustomerProfile = async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await pool.query(
      "SELECT user_id,username,email,name,address,phone FROM users INNER JOIN contact_info ON users.user_id=contact_info.contact_info_id WHERE user_id=?",
      [user_id]
    );
    if (!user || user.length == 0) {
      return res.status(404).send({ error: "Customer not found" });
    }
    return res.send(user[0]);
  } catch (error) {
    return res.status(500).send({ error: "Internal Server error" });
  }
};
