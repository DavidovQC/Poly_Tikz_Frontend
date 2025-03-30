import { useState, useEffect } from "react";
import Dropdown from "../Dropdown";
import DeleteLayerButton from "../DeleteLayerButton";

function FunctionLayer({ id, dispatch }) {
    const [functionInput, setFunctionInput] = useState("");
    const [thickness, setThickness] = useState("thick");
    const [stroke, setStroke] = useState("solid");
    const [samples, setSamples] = useState(100);

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
            },
        });
    }, [functionInput, thickness, stroke, samples]);

    return (
        <Dropdown label="Function">
            <div className="graph-options-container">
                <div className="text-input-field">
                    <label>f(x) = </label>
                    <input
                        placeholder="function"
                        onChange={handleFunctionChange}
                    ></input>
                </div>
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
                <div>
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

                {/* <div className="checkbox-field">
                    <label>radians</label>
                    <input type="checkbox"></input>
                </div> */}
                <div className="range-field">
                    <div className="range-input">
                        <label>Samples</label>
                        <input
                            type="range"
                            min="1"
                            max="300"
                            value={samples}
                            onChange={handleSamplesChange}
                        ></input>
                        <p>{samples}</p>
                    </div>
                </div>
                {/* <Dropdown label={"Domain / Range"}>
                    <div className="text-input-field">
                        <label>Domain:</label>

                        <input defaultValue={"(-10, 10)"}></input>
                    </div>
                    <div className="text-input-field">
                        <label>Range:</label>
                        <input defaultValue={"(-10, 10)"}></input>
                    </div>
                </Dropdown> */}
            </div>
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
        </Dropdown>
    );
}

export default FunctionLayer;
