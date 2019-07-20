const pool = require("../database/database");
exports.getImportStats = async (req, res) => {
  const { year, month, day } = req.query;
  try {
    if (year && month && day) {
      const total = await pool.query(
        "SELECT SUM(total_price) AS import_amount, COUNT(bill_no) AS total_imports FROM import WHERE YEAR(import_date)=? AND MONTH(import_date)=? AND DAY(import_date)=?",
        [year, month, day]
      );
      return res.send(...total);
    }
    if (year && month) {
      const total = await pool.query(
        "SELECT SUM(total_price) AS import_amount, COUNT(bill_no) AS total_imports FROM import WHERE YEAR(import_date)=? AND MONTH(import_date)=?",
        [year, month]
      );
      return res.send(...total);
    }
    if (year) {
      const total = await pool.query(
        "SELECT SUM(total_price) AS import_amount, COUNT(bill_no) AS total_imports FROM import WHERE YEAR(import_date)=?",
        [year]
      );
      return res.send(...total);
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};
