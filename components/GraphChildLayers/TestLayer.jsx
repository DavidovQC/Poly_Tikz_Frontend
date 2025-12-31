import { useState, useEffect } from "react";
import { shallowEqual } from "../../utils/shallow-equals";

import "../../styles/GraphLayerComponentStyles/circle-layers-styles.css";

import Dropdown from "../Dropdown";
import NumberInputField from "../InputWidgets/NumberInputField";

function TestLayer({ id, dispatch, layer, isVisible }) {
    //Main
    const [xOrigin, setXOrigin] = useState(layer.xOrigin ?? 0);

    //Dropdown Data
    const [isOpen, setIsOpen] = useState(layer.isOpen ?? false);

    //Handlers
    function handleXOriginChange(e) {
        setXOrigin(e.target.value);
    }

    const objectData = [xOrigin];
    const dropdownData = [isOpen];

    useEffect(() => {
        const newLayer = {
            type: "Test",
            id: id,
            isVisible: isVisible,

            //Object data:
            xOrigin: xOrigin,

            //Dropdown data:
            isOpen: isOpen,
        };

        if (shallowEqual(newLayer, layer)) return;

        dispatch({
            type: "edit_layer",
            newLayer: newLayer,
        });
    }, [objectData, dropdownData]);

    return (
        <Dropdown label="Test" isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="main-circle-container">
                <div className="main-circle-column-1">
                    <NumberInputField
                        label={"origin x:"}
                        step={0.1}
                        value={xOrigin}
                        onChangeFunction={handleXOriginChange}
                    ></NumberInputField>
                </div>
            </div>
        </Dropdown>
    );
}

export default TestLayer;
