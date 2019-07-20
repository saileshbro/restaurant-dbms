const pool = require("../database/database");
const { generateId } = require("../functions/id");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.createCustomer = async (req, res) => {
  const { username, password, name, address, email, phone } = req.body;
  try {
    const ifExists = await pool.query(
      "SELECT username,email FROM users INNER JOIN contact_info ON users.user_id=contact_info.contact_info_id WHERE username=? OR email=?",
      [username, email]
    );
    if (ifExists && ifExists.length > 0) {
      return res.status(403).send({ error: "User already exists" });
    }
    const user_id = generateId("CUST");
    const insertIntoContactInfo = await pool.query(
      "INSERT INTO contact_info SET contact_info_id=?,name=?,address=?,email=?,phone=?",
      [user_id, name, address, email, phone]
    );
    if (insertIntoContactInfo.affectedRows == 1 && insertIntoContactInfo) {
      const hashpw = await bcrypt.hash(
        password,
        parseInt(process.env.HASH_ROUNDS)
      );
      const insertUser = await pool.query(
        "INSERT INTO users SET user_id=?,username=?,password=?",
        [user_id, username, hashpw]
      );
      if (insertUser && insertUser.affectedRows == 1) {
        const token = await jwt.sign(
          {
            user_id
          },
          process.env.JWT_SECRET
        );
        return res.send({
          user_id,
          username,
          email,
          name,
          address,
          phone,
          token
        });
      } else {
        await pool.query("DELETE FROM contact_info WHERE contact_info_id=?", [
          user_id
        ]);
        return res.status(403).send({ error: "Unable to signup" });
      }
    } else {
      return res.status(403).send({ error: "Unable to signup" });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};

module.exports.createManager = async (req, res) => {
  const {
    username,
    staff_category,
    password,
    name,
    address,
    email,
    phone
  } = req.body;
  if (!staff_category || staff_category.length == 0) {
    return res.status(403).send({ error: "Staff category must be provided." });
  }
  try {
    const ifExists = await pool.query(
      "SELECT username,email,staff_category FROM users LEFT JOIN contact_info ON users.user_id=contact_info.contact_info_id  LEFT JOIN staff ON users.user_id=staff.staff_id WHERE (username=? OR email=?) OR staff_category=?",
      [username, email, staff_category]
    );
    if (ifExists && ifExists.length > 0) {
      return res.status(403).send({ error: "User already exists" });
    }
    const categoryCheck = await pool.query(
      "SELECT * FROM staff_category WHERE staff_category=?",
      [staff_category]
    );
    if (categoryCheck.length == 0) {
      return res.send({
        error: "Provided category doesn't exist. Please add the category"
      });
    }
    const user_id = generateId("MGR");
    const insertIntoContactInfo = await pool.query(
      "INSERT INTO contact_info SET contact_info_id=?,name=?,address=?,email=?,phone=?",
      [user_id, name, address, email, phone]
    );
    if (insertIntoContactInfo.affectedRows == 1 && insertIntoContactInfo) {
      const hashpw = await bcrypt.hash(
        password,
        parseInt(process.env.HASH_ROUNDS)
      );
      const insertUser = await pool.query(
        "INSERT INTO users SET user_id=?,username=?,password=?",
        [user_id, username, hashpw]
      );

      const insertStaff = await pool.query(
        "INSERT INTO staff SET staff_id=?,staff_category=?",
        [user_id, staff_category]
      );

      if (
        insertUser &&
        insertUser.affectedRows == 1 &&
        insertStaff &&
        insertStaff.affectedRows == 1
      ) {
        const token = await jwt.sign(
          {
            user_id
          },
          process.env.JWT_SECRET
        );
        return res.send({
          user_id,
          username,
          email,
          name,
          address,
          phone,
          token
        });
      } else {
        await pool.query("DELETE FROM contact_info WHERE contact_info_id=?", [
          user_id
        ]);
        return res.status(403).send({ error: "Unable to signup" });
      }
    } else {
      return res.status(403).send({ error: "Unable to signup" });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};
exports.createWaiter = async (req, res) => {
  const {
    username,
    staff_category,
    password,
    name,
    address,
    email,
    phone
  } = req.body;
  if (!staff_category || staff_category.length == 0) {
    return res.status(403).send({ error: "Staff category must be provided." });
  }
  try {
    const ifExists = await pool.query(
      "SELECT username,email,staff_category FROM users LEFT JOIN contact_info ON users.user_id=contact_info.contact_info_id  LEFT JOIN staff ON users.user_id=staff.staff_id WHERE (username=? OR email=?) AND staff_category=?",
      [username, email, staff_category]
    );
    if (ifExists && ifExists.length > 0) {
      return res.status(403).send({ error: "User already exists" });
    }
    const categoryCheck = await pool.query(
      "SELECT * FROM staff_category WHERE staff_category=?",
      [staff_category]
    );
    if (categoryCheck.length == 0) {
      return res.send({
        error: "Provided category doesn't exist. Please add the category"
      });
    }
    const user_id = generateId("WAIT");
    const insertIntoContactInfo = await pool.query(
      "INSERT INTO contact_info SET contact_info_id=?,name=?,address=?,email=?,phone=?",
      [user_id, name, address, email, phone]
    );
    if (insertIntoContactInfo.affectedRows == 1 && insertIntoContactInfo) {
      const hashpw = await bcrypt.hash(
        password,
        parseInt(process.env.HASH_ROUNDS)
      );
      const insertUser = await pool.query(
        "INSERT INTO users SET user_id=?,username=?,password=?",
        [user_id, username, hashpw]
      );

      const insertStaff = await pool.query(
        "INSERT INTO staff SET staff_id=?,staff_category=?",
        [user_id, staff_category]
      );

      if (
        insertUser &&
        insertUser.affectedRows == 1 &&
        insertStaff &&
        insertStaff.affectedRows == 1
      ) {
        const token = await jwt.sign(
          {
            user_id
          },
          process.env.JWT_SECRET
        );
        return res.send({
          user_id,
          username,
          email,
          name,
          address,
          phone,
          token
        });
      } else {
        await pool.query("DELETE FROM contact_info WHERE contact_info_id=?", [
          user_id
        ]);
        return res.status(403).send({ error: "Unable to signup" });
      }
    } else {
      return res.status(403).send({ error: "Unable to signup" });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};
exports.createKitchen = async (req, res) => {
  const {
    username,
    staff_category,
    password,
    name,
    address,
    email,
    phone
  } = req.body;
  if (!staff_category || staff_category.length == 0) {
    return res.status(403).send({ error: "Staff category must be provided." });
  }
  try {
    const ifExists = await pool.query(
      "SELECT username,email,staff_category FROM users LEFT JOIN contact_info ON users.user_id=contact_info.contact_info_id  LEFT JOIN staff ON users.user_id=staff.staff_id WHERE (username=? OR email=?) AND staff_category=?",
      [username, email, staff_category]
    );
    if (ifExists && ifExists.length > 0) {
      return res.status(403).send({ error: "User already exists" });
    }
    const categoryCheck = await pool.query(
      "SELECT * FROM staff_category WHERE staff_category=?",
      [staff_category]
    );
    if (categoryCheck.length == 0) {
      return res.send({
        error: "Provided category doesn't exist. Please add the category"
      });
    }
    const user_id = generateId("CHEF");
    const insertIntoContactInfo = await pool.query(
      "INSERT INTO contact_info SET contact_info_id=?,name=?,address=?,email=?,phone=?",
      [user_id, name, address, email, phone]
    );
    if (insertIntoContactInfo.affectedRows == 1 && insertIntoContactInfo) {
      const hashpw = await bcrypt.hash(
        password,
        parseInt(process.env.HASH_ROUNDS)
      );
      const insertUser = await pool.query(
        "INSERT INTO users SET user_id=?,username=?,password=?",
        [user_id, username, hashpw]
      );

      const insertStaff = await pool.query(
        "INSERT INTO staff SET staff_id=?,staff_category=?",
        [user_id, staff_category]
      );

      if (
        insertUser &&
        insertUser.affectedRows == 1 &&
        insertStaff &&
        insertStaff.affectedRows == 1
      ) {
        const token = await jwt.sign(
          {
            user_id
          },
          process.env.JWT_SECRET
        );
        return res.send({
          user_id,
          username,
          email,
          name,
          address,
          phone,
          token
        });
      } else {
        await pool.query("DELETE FROM contact_info WHERE contact_info_id=?", [
          user_id
        ]);
        return res.status(403).send({ error: "Unable to signup" });
      }
    } else {
      return res.status(403).send({ error: "Unable to signup" });
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};
exports.getAllSignups = async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT user_id,username,email,name,address,phone,staff_category FROM users LEFT JOIN contact_info ON users.user_id=contact_info.contact_info_id INNER JOIN staff ON staff.staff_id=users.user_id"
    );
    return res.send(results);
  } catch (error) {
    return res.status(500).send({ error });
  }
};
