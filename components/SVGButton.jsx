import "../styles/svg-button.css";

function SVGButton({ svgTag, onClickFunction, value }) {
    return (
        <button className="svg-button" onClick={onClickFunction} value={value}>
            {svgTag}
        </button>
    );
}

export default SVGButton;
