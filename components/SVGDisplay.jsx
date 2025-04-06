import { useContext } from "react";
import "../styles/svg-display-styles.css";
import { AppContext } from "../src/AppContext";

function SVGDisplay({ svg }) {
    const { isLoading } = useContext(AppContext);

    return (
        <div className="test-container">
            {isLoading ? (
                <div className="loading-text">Loading ...</div>
            ) : (
                <div
                    className="SVG-container"
                    dangerouslySetInnerHTML={{
                        __html: svg,
                    }}
                ></div>
            )}
        </div>
    );
}

export default SVGDisplay;
