import { useState } from "react";
import Dropdown from "../Dropdown";
import NumberInputField from "../InputWidgets/NumberInputField";

function SettingsLayer() {
    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(300);

    function handleWidthChange(e) {
        setWidth(e.target.value);
    }

    function handleHeightChange(e) {
        setHeight(e.target.value);
    }

    return (
        <div>
            <Dropdown label={`Settings`}>
                <NumberInputField
                    label={"height:"}
                    onChangeFunction={handleWidthChange}
                    value={width}
                    step={1}
                ></NumberInputField>
                <NumberInputField
                    label={"width:"}
                    onChangeFunction={handleHeightChange}
                    value={height}
                    step={1}
                ></NumberInputField>
            </Dropdown>
        </div>
    );
}

export default SettingsLayer;
