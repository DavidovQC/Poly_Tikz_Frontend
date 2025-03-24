import { useState, useEffect } from "react";
import Dropdown from "../Dropdown";

function FunctionLayer({ id, dispatch }) {
    const [functionInput, setFunctionInput] = useState("");

    function handleFunctionChange(e) {
        setFunctionInput(e.target.value);
    }

    useEffect(() => {
        dispatch({
            type: "edit_layer",
            newLayer: {
                type: "Function",
                id: id,
                function: functionInput,
            },
        });
    }, [functionInput]);

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
                    <label>Stroke: </label>
                    <select className="stroke">
                        <option>Fill</option>
                        <option>Dotted</option>
                    </select>
                </div>
                <div className="checkbox-field">
                    <label>radians</label>
                    <input type="checkbox"></input>
                </div>
                <div className="range-field">
                    <label>Samples</label>
                    <input
                        type="range"
                        min="1"
                        max="300"
                        defaultValue="150"
                    ></input>
                </div>
                <Dropdown label={"Domain / Range"}>
                    <div className="text-input-field">
                        <label>Domain:</label>

                        <input defaultValue={"(-10, 10)"}></input>
                    </div>
                    <div className="text-input-field">
                        <label>Range:</label>
                        <input defaultValue={"(-10, 10)"}></input>
                    </div>
                </Dropdown>
            </div>
        </Dropdown>
    );
}

export default FunctionLayer;
