import "../../styles/InputWidgetStyles/checkbox-input-field-styles.css";

function CheckboxInputField({ label, onChangeFunction, value }) {
    return (
        <div className="checkbox-input-field">
            <input
                type="checkbox"
                onChange={onChangeFunction}
                checked={value}
                defaultChecked={value}
            ></input>
            <label>{label}</label>
        </div>
    );
}

export default CheckboxInputField;
