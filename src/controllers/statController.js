const pool = require("../database/database");
exports.getImportStats = async (req, res) => {
  const { year, month, day } = req.query;
  try {
    if (year && month && day) {
      const total = await pool.query(
        "SELECT COALESCE(SUM(total_price),0) AS import_amount, COUNT(bill_no) AS total_imports FROM import WHERE YEAR(import_date)=? AND MONTH(import_date)=? AND DAY(import_date)=?",
        [year, month, day]
      );
      return res.send(...total);
    }
    if (year && month) {
      const total = await pool.query(
        "SELECT COALESCE(SUM(total_price),0) AS import_amount, COUNT(bill_no) AS total_imports FROM import WHERE YEAR(import_date)=? AND MONTH(import_date)=?",
        [year, month]
      );
      return res.send(...total);
    }
    if (year) {
      const total = await pool.query(
        "SELECT COALESCE(SUM(total_price),0) AS import_amount, COUNT(bill_no) AS total_imports FROM import WHERE YEAR(import_date)=?",
        [year]
      );
      return res.send(...total);
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};
exports.getImportStatsByImportGood = async (req, res) => {
  try {
    const results = await pool.query(
      "SELECT import_good,sum(quantity) AS quantity,sum(price) as total_cost,sum(price)*100/(select sum(price) from import_detail) as percentage from import_detail group by import_good,import_type ORDER BY total_cost DESC"
    );
    return res.send({ imports: results });
  } catch (error) {
    return res.status(500).send({ error });
  }
};
exports.getImportStatsByImportType = async (req, res) => {
  try {
    const results = await pool.query(
      "select import_type,count(import_good)*100/(SELECT count(import_good) from import_detail) AS percentage,sum(price) as total_price,sum(quantity) as total_quantity from import_detail group by import_type ORDER BY total_price"
    );
    return res.send({ imports: results });
  } catch (error) {
    return res.status({ error });
  }
};
exports.getBillStats = async (req, res) => {
  console.log(req.query);
  const { year, month, day } = req.query;
  try {
    if (year && month && day) {
      const total = await pool.query(
        "SELECT COALESCE(SUM(total_price),0) AS bill_amount, COUNT(bill_no) AS total_bill_issued FROM bill WHERE YEAR(issue_date)=? AND MONTH(issue_date)=? AND DAY(issue_date)=?",
        [year, month, day]
      );
      return res.send(...total);
    }
    if (year && month) {
      const total = await pool.query(
        "SELECT COALESCE(SUM(total_price),0) AS bill_amount, COUNT(bill_no) AS total_bill_issued FROM bill WHERE YEAR(issue_date)=? AND MONTH(issue_date)=?",
        [year, month]
      );
      return res.send(...total);
    }
    if (year) {
      const total = await pool.query(
        "SELECT COALESCE(SUM(total_price),0) AS bill_amount, COUNT(bill_no) AS total_bill_issued FROM bill WHERE YEAR(issue_date)=?",
        [year]
      );
      return res.send(...total);
    }
  } catch (error) {
    return res.status(500).send({ error });
  }
};
exports.getSalesReport = async (req, res) => {
  try {
    const totalSales = await pool.query(
      "SELECT COALESCE(SUM(total_price),0) AS total_sales FROM bill"
    );
    return res.send({ sales: totalSales[0] });
  } catch (error) {
    return res.status(500).send({ error });
  }
};
