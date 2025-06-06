import { useState, useEffect } from "react";
import Dropdown from "../Dropdown";
import InfoLabel from "../InfoLabel";
import DeleteLayerButton from "../DeleteLayerButton";
import "../../styles/function-layers-styles.css";

function FunctionLayer({ id, dispatch }) {
    const [functionInput, setFunctionInput] = useState("");
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
                <div className="main-function-options-container-grid">
                    <div className="function-settings-container">
                        <div className="function-input-container">
                            <div className="text-input-field">
                                <label>f(x) = </label>
                                <input
                                    placeholder="function"
                                    onChange={handleFunctionChange}
                                ></input>
                            </div>
                            <InfoLabel infoText="Write '\x' in place of 'x' (e.g, (\x)^2)"></InfoLabel>
                        </div>

                        <div className="thickness-container">
                            <div>
                                <label>Thickness: </label>
                                <select
                                    className="thickness"
                                    value={thickness}
                                    onChange={handleThicknessChange}
                                >
                                    <option>ultra thin</option>
                                    <option>very thin</option>
                                    <option>thin</option>
                                    <option>semithick</option>
                                    <option>thick</option>
                                    <option>very thick</option>
                                    <option>ultra thick</option>
                                </select>
                            </div>
                        </div>

                        <div className="stroke-container">
                            <label>Stroke: </label>
                            <select
                                className="stroke"
                                value={stroke}
                                onChange={handleStrokeChange}
                            >
                                <option>solid</option>
                                <option>dotted</option>
                                <option>dashed</option>
                            </select>
                        </div>
                    </div>

                    <div className="function-style-container">
                        <div className="samples-container">
                            <div className="range-field">
                                <div className="range-input">
                                    <div className="samples-text-display">
                                        <label>Samples</label>{" "}
                                        <p>: {samples}</p>
                                    </div>

                                    <input
                                        type="range"
                                        min="1"
                                        max="300"
                                        value={samples}
                                        onChange={handleSamplesChange}
                                    ></input>
                                </div>
                            </div>
                        </div>

                        <div className="color-input-field">
                            <label>color: </label>
                            <input
                                type="color"
                                value={color}
                                onChange={handleColorChange}
                            ></input>
                        </div>
                    </div>
                </div>
            </div>
            <div className="delete-button-container">
                <DeleteLayerButton
                    clickFunction={() =>
                        dispatch({
                            type: "delete_layer",
                            payload: {
                                id: id,
                            },
                        })
                    }
                ></DeleteLayerButton>
            </div>
        </Dropdown>
    );
}

export default FunctionLayer;
