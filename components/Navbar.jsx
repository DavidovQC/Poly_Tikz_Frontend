import "../styles/navbar-styles.css";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="navbar-container">
            <div className="navbar-elements">
                <p>
                    <Link to="/">Home</Link>
                </p>
                <p>
                    <Link to="/About">About</Link>
                </p>
                <p>
                    <Link to="/Contact">Contact</Link>
                </p>
            </div>
        </div>
    );
}

export default Navbar;
