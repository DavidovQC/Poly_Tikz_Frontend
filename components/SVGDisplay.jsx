import { useState } from "react";
import "./styles/SVG-container.css";

function SVGDisplay({ svg }) {
    return (
        <div
            className="SVG-container"
            dangerouslySetInnerHTML={{
                __html: svg,
            }}
        ></div>
    );
}

export default SVGDisplay;
