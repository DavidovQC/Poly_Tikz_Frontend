import { useState } from "react";
import "../styles/info-label.css";

function InfoLabel({ infoText, labelName }) {
    const [hovered, setHovered] = useState(true);

    function handleHoverChange() {
        setHovered(!hovered);
        console.log(hovered);
    }

    return (
        <div className="info-label-container">
            <div
                className="info-container"
                onMouseEnter={() => handleHoverChange()}
                onMouseLeave={() => handleHoverChange()}
            >
                <div className="i-container">
                    <p>i</p>
                </div>
            </div>

            <div className={hovered ? "invisible" : "visible"}>
                <p>{infoText}</p>
            </div>
        </div>
    );
}

export default InfoLabel;
