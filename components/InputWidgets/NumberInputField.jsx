import "../../styles/InputWidgetStyles/number-input-field-styles.css";

function NumberInputField({ label, min, max, step, value, onChangeFunction }) {
    return (
        <div className="number-input-field-container">
            <label>{label}</label>
            <input
                type="number"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onChangeFunction}
            ></input>
        </div>
    );
}

export default NumberInputField;
