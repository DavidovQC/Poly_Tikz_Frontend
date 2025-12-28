import "../../styles/InputWidgetStyles/large-text-input-field-styles.css";
import InfoLabel from "../InfoLabel";

function LargeTextInputField({
    label,
    onChangeFunction,
    value,
    placeholder,
    infoText,
}) {
    return (
        <div className="large-text-input-field-container">
            <div className="large-text-input-header">
                <label>{label}</label>
                <InfoLabel infoText={infoText} />
            </div>

            <textarea
                onChange={onChangeFunction}
                value={value}
                placeholder={placeholder}
            ></textarea>
        </div>
    );
}

export default LargeTextInputField;
