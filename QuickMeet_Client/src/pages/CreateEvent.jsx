import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function CreateEvent() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [venue, setVenue] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const combinedDate = new Date(`${date}T${time}`);

            await API.post("/events", {
                title,
                description,
                date: combinedDate,
                venue,
            });

            alert("Event Created!");
            navigate("/dashboard");
        } catch (err) {
            console.log("ERROR:", err.response?.data || err);
            alert("Error creating event");
        }
    };

    return (
        <div style={{ padding: "40px", maxWidth: "500px", margin: "auto" }}>
            <h2>Create Event</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Venue"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                />

                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateEvent;