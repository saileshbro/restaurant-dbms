const router = require("express").Router();
const { contactValidator } = require("../middlewares/contactvalidator");
const reservationController = require("../controllers/reservationController");
router.post(
    "/reservation",
    contactValidator,
    reservationController.addReservation
);
router.get("/reservations", reservationController.getReservations);
router.get(
    "/reservation/:reservation_date",
    reservationController.getReservation
);
router.get(
    "/reservation/:customer_id",
    reservationController.getReservationByCustomer
);
router.get(
    "/reservation/:table_no",
    reservationController.getReservationByTable
);

router.patch(
    "/reservation",
    contactValidator,
    reservationController.updateReservation
);
router.delete(
    "/reservation",
    reservationController.deleteReservation
);

module.exports = router;