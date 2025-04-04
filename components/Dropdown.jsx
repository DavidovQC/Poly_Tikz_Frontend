import { useState } from "react";
import "../styles/dropdown-styles.css";

function Dropdown({ children, label }) {
    const [display, setDisplay] = useState(false);
    function handleDisplayChange() {
        setDisplay(!display);
    }

    return (
        <div
            className={
                display ? "dropdown-container open" : "dropdown-container "
            }
        >
            <div
                className="dropdown-title-container"
                onClick={handleDisplayChange}
            >
                <div className="arrow">▼</div>
                <div className="label-container">
                    <label>{label}</label>
                </div>
            </div>
            {display && (
                <div className="dropdown-contents-container">{children}</div>
            )}
        </div>
    );
}

export default Dropdown;
