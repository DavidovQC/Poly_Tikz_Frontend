import Dropdown from "../Dropdown";
import { useState, useRef } from "react";

function AxisLayer() {
    const [graphType, setGraphType] = useState("Cross");
    const [gridOn, setGridOn] = useState(false);
    const [ticksOn, setTicksOn] = useState(false);

    const xAxisSizeInput = useRef(1);
    const yAxisSizeInput = useRef(1);
    const gridStep = useRef(1);
    const ticksStep = useRef(1);

    function handleGraphTypeChange(event) {
        setGraphType(event.target.value);
    }

    function handleGridChange() {
        setGridOn(!gridOn);
    }

    function handleTicksChange() {
        setTicksOn(!ticksOn);
    }

    return (
        <Dropdown label="Axes">
            <div className="Axis-options graph-options-container">
                <div className="graph-button-container">
                    <button onClick={handleGraphTypeChange} value={"Cross"}>
                        Cross
                    </button>
                    <button onClick={handleGraphTypeChange} value={"L-Shape"}>
                        L-Shape
                    </button>
                    <button onClick={handleGraphTypeChange} value={"T-Bar"}>
                        T-Bar
                    </button>
                </div>
                <div className="axis-size-container">
                    <div className="x-axis-container">
                        <label>x-axis size:</label>
                        <input
                            className="number-input-field"
                            ref={xAxisSizeInput}
                            defaultValue={1}
                            type="number"
                            min={0.1}
                            max={10}
                            step={0.1}
                        ></input>
                    </div>
                    <div className="y-axis-container">
                        <label>y-axis size:</label>
                        <input
                            className="number-input-field"
                            ref={yAxisSizeInput}
                            defaultValue={1}
                            type="number"
                            min={0.1}
                            max={10}
                            step={0.1}
                        ></input>
                    </div>
                </div>

                <div className="checkbox-field">
                    <label>arrows</label>
                    <input type="checkbox"></input>
                </div>

                <Dropdown label="Ticks">
                    <div className="checkbox-field">
                        <label>x-axis</label>
                        <input
                            type="checkbox"
                            value={ticksOn}
                            onChange={handleTicksChange}
                        ></input>
                    </div>

                    <div className="checkbox-field">
                        <label>y-axis</label>
                        <input
                            type="checkbox"
                            value={ticksOn}
                            onChange={handleTicksChange}
                        ></input>
                    </div>

                    <div className="checkbox-field">
                        <label>radians</label>
                        <input type="checkbox"></input>
                    </div>
                    <div>
                        <label>Step:</label>
                        <input
                            type="number"
                            step={0.1}
                            max="10"
                            defaultValue={1}
                        ></input>
                    </div>
                    <div>
                        <label>Spacing:</label>
                        <input
                            type="number"
                            step={0.1}
                            max="10"
                            defaultValue={1}
                        ></input>
                    </div>
                </Dropdown>

                <Dropdown label="Grid">
                    <div className="Grid-options graph-options-container">
                        <div className="checkbox-field">
                            <label>grid</label>
                            <input
                                type="checkbox"
                                checked={gridOn}
                                onClick={handleGridChange}
                            ></input>
                        </div>

                        <div>
                            <label>step: </label>
                            <input
                                ref={gridStep}
                                type="number"
                                defaultValue="1"
                                min=".1"
                                max="3"
                                step=".1"
                            ></input>
                        </div>
                    </div>
                </Dropdown>
                <Dropdown label="Custom"></Dropdown>
            </div>
        </Dropdown>
    );
}

export default AxisLayer;
