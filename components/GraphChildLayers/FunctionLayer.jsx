import { useState, useEffect } from "react";
import { shallowEqual } from "../../utils/shallow-equals";

import "../../styles/GraphLayerComponentStyles/function-layers-styles.css";

import Dropdown from "../Dropdown";
import InfoLabel from "../InfoLabel";
import TextInputField from "../InputWidgets/TextInputField";
import DropdownInputField from "../InputWidgets/DropdownInputField";
import SliderInputField from "../InputWidgets/SliderInputField";
import ColorInputField from "../InputWidgets/ColorInputField";

function FunctionLayer({ id, dispatch, layer, isVisible }) {
    //Main
    const [functionInput, setFunctionInput] = useState(
        layer.functionInput ?? "(\\x)^2"
    );
    const [thickness, setThickness] = useState(layer.thickness ?? "thick");
    const [stroke, setStroke] = useState(layer.stroke ?? "solid");
    const [color, setColor] = useState(layer.color ?? "#0000ff");

    //Advanced
    const [samples, setSamples] = useState(layer.samples ?? 100);

    //Dropdown options
    const [isOpen, setIsOpen] = useState(layer.isOpen ?? false);
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(
        layer.isAdvancedOpen ?? false
    );

    const objectData = [functionInput, thickness, stroke, color, samples];
    const dropdownData = [isOpen, isAdvancedOpen];

    function handleFunctionChange(e) {
        setFunctionInput(e.target.value);
    }

    function handleThicknessChange(e) {
        setThickness(e.target.value);
    }

    function handleStrokeChange(e) {
        setStroke(e.target.value);
    }

    function handleSamplesChange(e) {
        setSamples(e.target.value);
    }

    function handleColorChange(e) {
        setColor(e.target.value);
    }

    const thicknessOptions = [
        { value: "ultra thin", label: "ultra thin" },
        { value: "very thin", label: "very thin" },
        { value: "thin", label: "thin" },
        { value: "semithick", label: "semithick" },
        { value: "thick", label: "thick" },
        { value: "very thick", label: "very thick" },
        { value: "ultra thick", label: "ultra thick" },
    ];

    const strokeOptions = [
        { value: "solid", label: "solid" },
        { value: "dotted", label: "dotted" },
        { value: "dashed", label: "dashed" },
    ];

    useEffect(() => {
        const newLayer = {
            type: "Function",
            id: id,
            isVisible: isVisible,

            functionInput: functionInput,
            thickness: thickness,
            stroke: stroke,
            samples: samples,
            color: color,

            isOpen: isOpen,
            isAdvancedOpen: isAdvancedOpen,
        };

        if (shallowEqual(newLayer, layer)) return;

        dispatch({
            type: "edit_layer",
            newLayer: newLayer,
        });
    }, [objectData, dropdownData]);

    return (
        <Dropdown label="Function" isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="main-function-options-container">
                <div className="main-function-column-1">
                    <div className="function-input-container">
                        <div className="text-input-field">
                            <TextInputField
                                label={"f(x) = "}
                                placeholder={"function"}
                                onChangeFunction={handleFunctionChange}
                                value={functionInput}
                            ></TextInputField>
                        </div>
                        <InfoLabel infoText="Write '\x' in place of 'x' (e.g, (\x)^2)"></InfoLabel>
                    </div>

                    <DropdownInputField
                        label={"stroke: "}
                        onSelectFunction={handleStrokeChange}
                        values={strokeOptions}
                    ></DropdownInputField>
                </div>
                <div className="main-function-column-2">
                    <DropdownInputField
                        label={"thickness:"}
                        onSelectFunction={handleThicknessChange}
                        values={thicknessOptions}
                    ></DropdownInputField>

                    <ColorInputField
                        label={"color:"}
                        value={color}
                        onChangeFunction={handleColorChange}
                    ></ColorInputField>
                </div>
            </div>
            <Dropdown
                label={"Advanced"}
                isOpen={isAdvancedOpen}
                setIsOpen={setIsAdvancedOpen}
            >
                <div className="advanced-function-container">
                    <div className="advanced-function-row-1">
                        <SliderInputField
                            label={"samples"}
                            value={samples}
                            onChangeFunction={handleSamplesChange}
                            min={1}
                            max={300}
                        ></SliderInputField>
                    </div>
                </div>
            </Dropdown>
        </Dropdown>
    );
}

export default FunctionLayer;
