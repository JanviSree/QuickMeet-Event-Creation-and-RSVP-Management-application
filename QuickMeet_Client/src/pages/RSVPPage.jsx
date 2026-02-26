import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

function RSVPPage() {
    const { id } = useParams();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post(`/rsvp/${id}`, form);
            alert("RSVP Submitted Successfully!");
        } catch (err) {
            console.log(err);
            alert("Error submitting RSVP");
        }
    };

    return (
        <div>
            <h2>RSVP</h2>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Name"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <br /><br />

                <input
                    placeholder="Email"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <br /><br />

                <input
                    placeholder="Phone"
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <br /><br />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default RSVPPage;