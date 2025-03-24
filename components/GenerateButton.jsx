import "../styles/button-styles.css";

function GenerateButton({ buttonFunction }) {
    return (
        <button className="generate-button" onClick={buttonFunction}>
            Generate
        </button>
    );
}

export default GenerateButton;
