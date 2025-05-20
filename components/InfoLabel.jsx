import { useState } from "react";
import "../styles/info-label.css";

function InfoLabel({ infoText }) {
    const [hovered, setHovered] = useState(false);

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

            {hovered && (
                <div className="tooltip">
                    <p>{infoText}</p>
                </div>
            )}
        </div>
    );
}

export default InfoLabel;
