import { useState } from "react";
import "../styles/svg-button.css";

function SVGButton({ svgTag, onClickFunction, value, focus }) {
    function handleClick(event) {
        onClickFunction(event);
    }

    return (
        <button
            className={focus ? "svg-button selected" : "svg-button"}
            onClick={handleClick}
            value={value}
        >
            {svgTag}
        </button>
    );
}

export default SVGButton;
