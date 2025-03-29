import "../styles/button-styles.css";

function DeleteLayerButton({ clickFunction }) {
    return (
        <button className="delete-button" onClick={clickFunction}>
            Delete
        </button>
    );
}

export default DeleteLayerButton;
