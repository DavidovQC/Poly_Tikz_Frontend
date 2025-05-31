function TextInputField({ label, onChangeFunction, value }) {
    return (
        <div className="text-input-field-container">
            <label>{label}</label>
            <input
                type="text"
                onChange={onChangeFunction}
                value={value}
            ></input>
        </div>
    );
}

export default TextInputField;
