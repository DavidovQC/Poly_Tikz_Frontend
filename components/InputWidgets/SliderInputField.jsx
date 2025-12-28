import "../../styles/InputWidgetStyles/slider-input-field-styles.css";

function SliderInputField({ label, onChangeFunction, value, min, max }) {
    return (
        <div className="slider-input-field-container">
            <label>{label}</label>

            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={onChangeFunction}
                style={{ "--fill": `${((value - min) / (max - min)) * 100}%` }}
            />

            <span className="slider-value">{value}</span>
        </div>
    );
}

export default SliderInputField;
