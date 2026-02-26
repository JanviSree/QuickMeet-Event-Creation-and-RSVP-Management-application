import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

function EventDetails() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eventRes = await API.get(`/events/${id}`);
                setEvent(eventRes.data);

                const participantRes = await API.get(`/rsvp/${id}`);
                setParticipants(participantRes.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [id]);

    const handleMarkPresent = async (rsvpId) => {
        try {
            await API.put(`/rsvp/attendance/${rsvpId}`);

            // Update UI instantly
            const updated = participants.map((p) =>
                p._id === rsvpId ? { ...p, attended: true } : p
            );

            setParticipants(updated);
        } catch (err) {
            console.log(err);
            alert("Error updating attendance");
        }
    };

    if (!event) {
        return <div style={{ padding: "40px" }}>Loading...</div>;
    }

    return (
        <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>

            {/* Event Info */}
            <div
                style={{
                    background: "#1e1e1e",
                    padding: "30px",
                    borderRadius: "12px",
                    marginBottom: "30px",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
                }}
            >
                <h2 style={{ marginBottom: "10px" }}>{event.title}</h2>
                <p>{event.description}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Venue:</strong> {event.venue}</p>
            </div>

            {/* Participants Section */}
            <h3 style={{ marginBottom: "20px" }}>Participants</h3>

            {participants.length === 0 && (
                <p style={{ color: "gray" }}>No participants yet.</p>
            )}

            {participants.map((p) => (
                <div
                    key={p._id}
                    style={{
                        background: "#1c1c1c",
                        padding: "20px",
                        borderRadius: "10px",
                        marginBottom: "15px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        boxShadow: "0 3px 10px rgba(0,0,0,0.2)"
                    }}
                >
                    <div>
                        <p style={{ margin: 0, fontWeight: "bold" }}>
                            {p.name}
                        </p>
                        <p style={{ margin: 0, fontSize: "14px", color: "#bbb" }}>
                            {p.email}
                        </p>
                    </div>

                    <div>
                        {p.attended ? (
                            <span style={{ color: "lightgreen", fontWeight: "bold" }}>
                                Present ✅
                            </span>
                        ) : (
                            <button
                                onClick={() => handleMarkPresent(p._id)}
                                style={{
                                    padding: "8px 15px",
                                    borderRadius: "6px",
                                    border: "none",
                                    background: "#333",
                                    color: "white",
                                    cursor: "pointer"
                                }}
                            >
                                Mark Present
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default EventDetails;