function DropdownInputField({ label, values, onSelectFunction }) {
    return (
        <div className="text-input-field-container">
            <label>{label}</label>
            <select onChange={onSelectFunction}>
                {values.map((item) => {
                    return (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}

export default DropdownInputField;
