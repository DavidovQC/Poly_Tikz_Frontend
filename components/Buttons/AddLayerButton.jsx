import "../../styles/add-layer-button-styles.css";

function AddLayerButton({ onClickFunction, buttonText }) {
    return (
        <div onClick={onClickFunction} className="add-button-container">
            {buttonText}
        </div>
    );
}

export default AddLayerButton;
