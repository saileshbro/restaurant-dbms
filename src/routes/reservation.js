const router = require("express").Router();
const { contactValidator } = require("../middlewares/contactvalidator");
const reservationController = require("../controllers/reservationController");