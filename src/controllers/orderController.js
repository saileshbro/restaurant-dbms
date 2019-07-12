const pool = require('../database/database');

module.exports.addOrder = async (req, res) => {
    try {
        console.log('eloo');
        // const { table_id } = req.params
        // const { }
    } catch (error) {
        return res.status(500).send({ error: 'Internal Server error' })
    }
}