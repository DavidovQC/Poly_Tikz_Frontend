import "../../styles/InputWidgetStyles/color-input-field-styles.css";

function ColorInputField({ label, onChangeFunction, value }) {
    return (
        <div className="color-input-field-container">
            <label>{label}</label>
            <input
                type="color"
                value={value}
                onChange={onChangeFunction}
            ></input>
        </div>
    );
}

export default ColorInputField;
