import "../styles/svg-display-styles.css";

function SVGDisplay({ svg }) {
    return (
        <div className="test-container">
            <div
                className="SVG-container"
                dangerouslySetInnerHTML={{
                    __html: svg,
                }}
            ></div>
        </div>
    );
}

export default SVGDisplay;
