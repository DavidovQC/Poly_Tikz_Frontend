import "../../styles/InputWidgetStyles/text-input-field-styles.css";

function TextInputField({ label, onChangeFunction, value, placeholder }) {
    return (
        <div className="text-input-field-container">
            <label>{label}</label>
            <input
                type="text"
                onChange={onChangeFunction}
                value={value}
                placeholder={placeholder}
            ></input>
        </div>
    );
}

export default TextInputField;
