import { useState, useEffect } from "react";
import Dropdown from "../Dropdown";
import InfoLabel from "../InfoLabel";
import DeleteLayerButton from "../DeleteLayerButton";
import "../../styles/GraphLayerComponentStyles/function-layers-styles.css";
import TextInputField from "../InputWidgets/TextInputField";
import DropdownInputField from "../InputWidgets/DropdownInputField";
import SliderInputField from "../InputWidgets/SliderInputField";
import ColorInputField from "../InputWidgets/ColorInputField";

function FunctionLayer({ id, dispatch }) {
    const [functionInput, setFunctionInput] = useState("(\\x)^2");
    const [thickness, setThickness] = useState("thick");
    const [stroke, setStroke] = useState("solid");
    const [samples, setSamples] = useState(100);
    const [color, setColor] = useState("#0000ff");

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
        dispatch({
            type: "edit_layer",
            newLayer: {
                type: "Function",
                id: id,
                function: functionInput,
                thickness: thickness,
                stroke: stroke,
                samples: samples,
                color: color,
            },
        });
    }, [functionInput, thickness, stroke, samples, color]);

    return (
        <Dropdown label="Function">
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
            <Dropdown label={"Advanced"}>
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
