const router = require("express").Router();
const {
    submitRSVP,
    getParticipants,
    markAttendance
} = require("../controllers/rsvpController");

router.post("/:eventId", submitRSVP);
router.get("/:eventId", getParticipants);
router.put("/attendance/:id", markAttendance);

module.exports = router;