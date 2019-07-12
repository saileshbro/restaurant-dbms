const pool = require('../database/database');
const validator = require('validator');
module.exports.createCustomer = (req, res) => {
    const {
        username,
        password,
        name,
        address,
        email,
        phone
    } = req.body;
    if (!validator.isLength(username, {
        min: 6
    })
    ) {
        return res.status(422).send({
            error: "Username must be 6 characters long."
        });
    }
    if (!validator.isEmail(email)) {
        return res.status(422).send({
            error: "Enter a valid email address."
        })
    }
    if (!validator.isLength(password, {
        min: 8
    })
    ) {
        return res.status(422).send({
            error: "Password must be 8 characters long."
        })
    }
};