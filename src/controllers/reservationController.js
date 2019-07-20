const pool = require("../database/database");
const { generateId } = require("../functions/id");

module.exports.addReservation = async (req, res) => {
    const {
        number_of_persons,
        reserved_for_date,
        reserved_for_time,
    } = req.body;
    const customer_id = req.params;
    const table_no = await pool.query("SELECT table_no from restaurant_table where is_empty=0 limit 1")
    try {
        const insertreservation = await pool.query(
            `INSERT INTO reservation SET customer_id=?,number_of_person=?,table_no=?,reserved_for_date=?,reserved_for_time=?`,
            [customer_id, number_of_persons, table_no, reserved_for_date, reserved_for_time]
        );
        if (insertreservation.affectedRows == 1) {
            return res.send({ message: "Reservation successfully added." });
        } else {
            return res.status(400).send({ error: "Unable to add reservation." });
        }

    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(500).send({
                error: "Reservation with given credentials already exists."
            });
        } else {
            return res.status(500).send({ error });
        }
    }
};

module.exports.getReservations = async (req, res) => {
    try {
        const results = await pool.query(
            `SELECT customer_id,name,phone,email,address,reservation_date,reserved_for_date,reserved_for_time,table_no,number_of_persons FROM reservation INNER JOIN contact_info ON reservation.customer_id= contact_info.contact_info_id ORDER BY reservation_date`
        );
        if (!results) {
            return res.status(404).json({ error: "Unable to get Reservations." });
        }
        return res.send({ reservations: results });
    } catch (error) {
        return res.send({ error: "Internal Server error." });
    }
};

module.exports.getReservation = async (req, res) => {
    const { reservation_date } = req.params;
    try {
        const result = await pool.query(
            `SELECT customer_id,name,phone,email,address,reservation_date,reserved_for_date,reserved_for_time,table_no,number_of_persons FROM reservation INNER JOIN contact_info ON reservation.customer_id= contact_info.contact_info_id where reservation_date=?`,
            [reservation_date]
        );
        if (!result) {
            return res.status(404).json({ error: "Couldn't get reservation." });
        }
        return res.send(result);
    } catch (error) {
        return res.send({ error: "Internal Server error." });
    }
};

module.exports.getReservationByCustomer = async (req, res) => {
    const { customer_id } = req.params;
    try {
        const result = await pool.query(
            `SELECT customer_id,name,phone,email,address,reservation_date,reserved_for_date,reserved_for_time,table_no,number_of_persons FROM reservation INNER JOIN contact_info ON reservation.customer_id= contact_info.contact_info_id where customer_id=?`,
            [customer_id]
        );
        if (!result) {
            return res.status(404).json({ error: "Couldn't get reservation." });
        }
        return res.send(result);
    } catch (error) {
        reserved_for_date
        return res.send({ error: "Internal Server error." });
    }
};

module.exports.getReservationByTable = async (req, res) => {
    const { table_no } = req.params;
    try {
        const result = await pool.query(
            `SELECT customer_id,name,phone,email,address,reservation_date,reserved_for_date,reserved_for_time,table_no,number_of_persons FROM reservation INNER JOIN contact_info ON reservation.customer_id= contact_info.contact_info_id where table_no=?`,
            [table_no]
        );
        if (!result) {
            return res.status(404).json({ error: "Couldn't get reservation." });
        }
        return res.send(result);
    } catch (error) {
        return res.send({ error: "Internal Server error." });
    }
};

module.exports.updateReservation = async (req, res) => {
    const {
        number_of_persons,
        reserved_for_date,
        reserved_for_time,
        reservation_fulfilled_status
    } = req.body;
    const { table_no, reservation_date } = req.query;
    if (!table_no || !reservation_date) {
        return res.status(403).send({ error: "Cannot update Reservation." });
    }
    try {

        const updateReservation = await pool.query(
            "UPDATE reservation SET reserved_for_date=?,reserved_for_date,number_of_persons=?,reservation_fulfilled_status WHERE import_company_id=?",
            [reserved_for_date, reserved_for_time, number_of_persons, reservation_fulfilled_status]
        );
        if (updateReservation.affectedRows == 1) {
            return res.send({ message: "Reservation Successfully updated." });
        } else {
            return res.status(400).send({ error: "Unable to update reservation." });
        }

    } catch (error) {
        if (error.code === "ER_DUP_ENTRY")
            return res
                .status(500)
                .send({ error: `Reservation credentials already exists.` });
        else return res.status(500).send({ error });
    }
};

module.exports.deleteReservation = async (req, res) => {
    const { table_no, reservation_date } = req.query;
    try {
        const ReservationDeleteresult = await pool.query(
            "DELETE FROM reservation WHERE table_no=?,reservation_date",
            [table_no, reservation_date]
        );
        if (ReservationDeleteresult.affectedRows == 1) {
            return res.send({ message: " Reservation Successfully deleted." });
        } else {
            return res.status(400).send({ error: "Unable to delete reservation." });
        }
    } catch (error) {
        return res.status(500).send({ error });
    }
};