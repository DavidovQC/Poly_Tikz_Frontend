import { useState } from "react";
import "../styles/dropdown-styles.css";

function Dropdown({ children, label }) {
    const [display, setDisplay] = useState(false);
    function handleDisplayChange() {
        setDisplay(!display);
        console.log(display);
    }

    return (
        <div className="dropdown-container">
            <div
                className="dropdown-title-container"
                onClick={handleDisplayChange}
            >
                <div className="arrow">▼</div>

                {label}
            </div>
            {display && (
                <div className="dropdown-elements-container">{children}</div>
            )}
        </div>
    );
}

export default Dropdown;
