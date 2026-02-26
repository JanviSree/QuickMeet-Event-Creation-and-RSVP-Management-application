const mongoose = require("mongoose");

const rsvpSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    },
    name: String,
    email: String,
    phone: String,
    attended: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("RSVP", rsvpSchema);