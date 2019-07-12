const pool = require("../database/database");
const validator = require("validator");
module.exports.createManager = async (req, res) => {
  const {
    username,
    password,
    staff_category,
    name,
    address,
    email,
    phone
  } = req.body;
  if (
    !validator.isLength(username, {
      min: 6
    })
  ) {
    return res.status(422).send({
      error: "Username must be greater than 6 chars."
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(422).send({ error: "Invalid email provided." });
  }
  if (!validator.isLength(password, { min: 8 })) {
    return res.status(422).send({
      error: "Password must be 8 chars long"
    });
  }
  if (!staff_category || staff_category.length == 0) {
    return res.status(403).send({ error: "Staff category must be provided." });
  }
  if (!/^[a-zA-Z][a-zA-Z\s]*$/.test(name)) {
    return res.status(422).send({ error: "Invalid name provided." });
  }
  if (!address || address.length == 0) {
    return res.status(422).send({ error: "Address must be provided" });
  }
  if (!validator.isMobilePhone(phone)) {
    return res.status(422).send({
      error: "Enter a valid phone number"
    });
  }
};
