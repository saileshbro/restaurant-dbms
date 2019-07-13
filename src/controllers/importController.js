const pool = require("../database/database");
const { generateId } = require("../functions/id");
module.exports.addImportCompany = async (req, res) => {
  const {
    name,
    address,
    email,
    phone,
    total_transaction,
    remain_transaction,
    purchase_type
  } = req.body;
  const contact_info_id = generateId("COMP");
  if (!purchase_type || purchase_type.length == 0) {
    return res.status(422).send({
      error: "Purchase type made from the company must be provided."
    });
  }
  try {
    const insertContact = await pool.query(
      "INSERT INTO contact_info SET name=?,email=?,phone=?,address=?,contact_info_id=?",
      [name, email, phone, address, contact_info_id]
    );
    if (insertContact.affectedRows == 1) {
      const insertCompany = await pool.query(
        "INSERT INTO import_company SET total_transactions=?,remain_transactions=?,purchase_type=?, import_company_id=?",
        [total_transaction, remain_transaction, purchase_type, contact_info_id]
      );
      if (insertCompany.affectedRows == 1) {
        return res.send({ message: "Import company successfully added." });
      } else {
        return res.status(400).send({ error: "Unable to add Company." });
      }
    } else {
      return res.status(400).send({
        error: "Unable to add contact informations to create a company."
      });
    }
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(500).send({
        error: "Company with given credentials already exists."
      });
    } else {
      return res.status(500).send({ error });
    }
  }
};

module.exports.getImportCompanies = async (req, res) => {
  try {
    const results = await pool.query(
      `SELECT name,phone,email,address,total_transactions,remain_transactions,purchase_type FROM import_company INNER JOIN contact_info ON import_company.import_company_id= contact_info.contact_info_id ORDER BY name`
    );
    if (!results) {
      return res.status(404).json({ error: "Unexpected error occured." });
    }
    return res.send({ import_companies: results });
  } catch (error) {
    return res.send({ error });
  }
};

module.exports.updateImportCompany = async (req, res) => {
  const {
    name,
    address,
    phone,
    email,
    total_transaction,
    remain_transaction,
    purchase_type
  } = req.body;
  const { import_company_id } = req.params;
  if (!import_company_id) {
    return res.status(403).send({ error: "Cannot update Company." });
  }
  try {
    const updateContact = await pool.query(
      "UPDATE contact_info SET name=?,address=?,email=?,phone=? WHERE contact_info_id=?",
      [name, address, email, phone, import_company_id]
    );
    if (updateContact.affectedRows == 1) {
      const updateCompany = await pool.query(
        "UPDATE import_company SET total_transactions=?,remaining_transactions=?,purchase_type=? WHERE import_company_id=?",
        [
          total_transaction,
          remain_transaction,
          purchase_type,
          import_company_id
        ]
      );
      if (updateCompany.affectedRows == 1) {
        return res.send({ message: "Import Company Successfully updated." });
      } else {
        return res.status(400).send({ error: "Unable to update company." });
      }
    } else {
      return res.status(400).send({ error: "Unable to update company." });
    }
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY")
      return res
        .status(500)
        .send({ error: `Company credentils already exists.` });
    else return res.status(500).send({ error: "Internal server error." });
  }
};

module.exports.deleteImportCompany = async (req, res) => {
  const { import_company_id } = req.params;
  try {
    const ContactDeleteresult = await pool.query(
      "DELETE FROM contact_info WHERE contact_info_id=?",
      [import_company_id]
    );
    if (ContactDeleteresult.affectedRows == 1) {
      const CompanyDeleteresult = await pool.query(
        "DELETE FROM contact_info WHERE contact_info_id=?",
        [import_company_id]
      );
      if (CompanyDeleteresult.affectedRows == 1) {
        return res.send({ message: " Import Company Successfully deleted." });
      } else {
        return res.status(400).send({ error: "Unable to delete company." });
      }
    } else {
      return res.status(400).send({ error: "Unable to delete company." });
    }
  } catch (error) {
    return res.status(500).send({ error: "Internal Server error" });
  }
};
