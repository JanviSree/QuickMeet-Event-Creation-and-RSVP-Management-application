const RSVP = require("../models/RSVP");

exports.submitRSVP = async (req, res) => {
    const rsvp = await RSVP.create({
        ...req.body,
        eventId: req.params.eventId
    });
    res.json(rsvp);
};

exports.getParticipants = async (req, res) => {
    const participants = await RSVP.find({ eventId: req.params.eventId });
    res.json(participants);
};

exports.markAttendance = async (req, res) => {
    try {
        const updated = await RSVP.findByIdAndUpdate(
            req.params.id,
            { attended: true },
            { new: true }
        );

        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: "Error updating attendance" });
    }
};