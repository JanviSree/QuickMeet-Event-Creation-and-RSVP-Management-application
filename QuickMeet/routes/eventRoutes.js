const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
    createEvent,
    getEvents,
    getSingleEvent,
    deleteEvent
} = require("../controllers/eventController");

router.post("/", auth, createEvent);
router.get("/", auth, getEvents);
router.get("/:id", getSingleEvent);
router.delete("/:id", auth, async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: "Event deleted" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed" });
    }
});

module.exports = router;