import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav style={{ padding: "10px", background: "#222", color: "white" }}>
            <Link to="/" style={{ marginRight: "15px", color: "white" }}>
                QuickMeet
            </Link>

            {token && (
                <>
                    <Link to="/dashboard" style={{ marginRight: "15px", color: "white" }}>
                        Dashboard
                    </Link>

                    <Link to="/create" style={{ marginRight: "15px", color: "white" }}>
                        Create Event
                    </Link>

                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </nav>
    );
}

export default Navbar;