module.exports.addReservation = async (req, res) => {
    const {
        name,
        address,
        email,
        phone,
        number_of_persons,
        reserved_date
    } = req.body;
    const contact_info_id = generateId("COMP");
    const table_no = await pool.query("SELECT table_no from restaurant_table")
    try {
        const insertContact = await pool.query(
            "INSERT INTO contact_info SET name=?,email=?,phone=?,address=?,contact_info_id=?",
            [name, email, phone, address, contact_info_id]
        );
        if (insertContact.affectedRows == 1) {
            const insertCompany = await pool.query(
                "INSERT INTO import_company SET total_transactions=?,remain_transactions=?, import_company_id=?",
                [total_transactions || 0.0, remain_transactions || 0.0, contact_info_id]
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
