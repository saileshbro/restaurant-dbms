const pool = require("../database/database");
module.exports.createCustomer = (req, res) => {};

module.exports.createManager = async (req, res) => {
  const { staff_category } = req.body;
  if (!staff_category || staff_category.length == 0) {
    return res.status(403).send({ error: "Staff category must be provided." });
  }
  return res.send("valid");
};
