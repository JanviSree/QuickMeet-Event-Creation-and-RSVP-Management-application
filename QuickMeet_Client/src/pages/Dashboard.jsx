import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function Dashboard() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await API.get("/events");
            setEvents(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/events/${id}`);
            setEvents(events.filter((event) => event._id !== id));
        } catch (err) {
            console.log(err);
            alert("Delete failed");
        }
    };

    const upcomingEvents = events.filter(
        (e) => new Date(e.date) > new Date()
    ).length;

    return (
        <div style={{ padding: "40px" }}>
            <h2 style={{ marginBottom: "10px" }}>Dashboard</h2>

            {/* Stats */}
            <div style={{ marginBottom: "20px" }}>
                <p>Total Events: {events.length}</p>
                <p>Upcoming Events: {upcomingEvents}</p>
            </div>

            <Link
                to="/create"
                style={{
                    display: "inline-block",
                    marginBottom: "30px",
                    padding: "10px 18px",
                    background: "#2563eb",
                    color: "white",
                    borderRadius: "8px",
                    textDecoration: "none",
                }}
            >
                + Create Event
            </Link>

            {/* Event Cards */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                }}
            >
                {events.map((event) => (
                    <div
                        key={event._id}
                        style={{
                            background: "#1f2937",
                            padding: "20px",
                            borderRadius: "12px",
                            width: "260px",
                            boxShadow: "0 5px 15px rgba(0,0,0,0.4)",
                        }}
                    >
                        <h3 style={{ marginBottom: "8px" }}>{event.title}</h3>

                        <p style={{ fontSize: "14px", opacity: 0.7 }}>
                            {new Date(event.date).toLocaleString()}
                        </p>

                        <div style={{ marginTop: "15px" }}>
                            <button
                                onClick={() => navigate(`/event/${event._id}`)}
                                style={{
                                    marginRight: "8px",
                                    padding: "6px 12px",
                                    borderRadius: "6px",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                View
                            </button>

                            <button
                                onClick={() => handleDelete(event._id)}
                                style={{
                                    padding: "6px 12px",
                                    borderRadius: "6px",
                                    background: "#dc2626",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;