import "../../styles/InputWidgetStyles/slider-input-field-styles.css";

function SliderInputField({ label, onChangeFunction, value, min, max }) {
    return (
        <div className="slider-input-field-display">
            <div className="slider-text-display">
                <label>{label}</label>
                <p> {value}</p>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={onChangeFunction}
            />
        </div>
    );
}

export default SliderInputField;
