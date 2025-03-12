import { useContext, useState } from "react";
import Dropdown from "./Dropdown";
import { AppContext } from "../src/AppContext";
import { useRef } from "react";
import "../styles/graph-component-styles.css";

function GraphComponent() {
    const { mySVG, setMySVG } = useContext(AppContext);

    //Graph contents
    const [graphType, setGraphType] = useState("Cross");
    const [gridOn, setGridOn] = useState(false);
    const [ticksOn, setTicksOn] = useState(false);
    const functionInput = useRef(``);
    const xAxisSizeInput = useRef("1");
    const yAxisSizeInput = useRef("1");
    const mGridSize = useRef("1");
    const nGridSize = useRef("1");
    const gridStep = useRef("1");
    const functionDomain = useRef("(-1, 1)");

    function handleTicksChange() {
        setTicksOn(!ticksOn);
    }

    function handleGraphTypeChange(event) {
        setGraphType(event.target.value);
    }

    function handleGridChange() {
        setGridOn(!gridOn);
        console.log(gridOn);
    }

    async function GenerateGraph() {
        const graphData = {
            Type: graphType,
            Grid: gridOn,
            Ticks: ticksOn,
            function: functionInput.current.value,
            functionDomain: functionDomain.current.value,
            xAxisSize: xAxisSizeInput.current.value,
            yAxisSize: yAxisSizeInput.current.value,
            GridStep: gridStep.current.value,
        };

        console.log(`Graph data: ${JSON.stringify(graphData)}`);

        const response = await fetch("http://localhost:3000/api/getGraphSVG", {
            method: "POST",
            body: JSON.stringify(graphData),
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log(functionInput.current.value);

        const newSVG = await response.text();
        setMySVG(newSVG);
    }

    async function PostTest() {
        const response = await fetch("http://localhost:3000/api/postTest", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const newSVG = await response.text();
        setMySVG(newSVG);
    }

    return (
        <div className="graph-component-container">
            <Dropdown label="Axes">
                <div className="Axis-options graph-options-container">
                    <div className="graph-button-container">
                        <button onClick={handleGraphTypeChange} value={"Cross"}>
                            Cross
                        </button>
                        <button
                            onClick={handleGraphTypeChange}
                            value={"L-Shape"}
                        >
                            L-Shape
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
                                min="0.1"
                                max="10"
                                step=".1"
                            ></input>
                        </div>
                        <div className="y-axis-container">
                            <label>y-axis size:</label>
                            <input
                                className="number-input-field"
                                ref={yAxisSizeInput}
                                defaultValue={1}
                                type="number"
                                min="0.1"
                                max="10"
                                step=".1"
                            ></input>
                        </div>
                    </div>

                    <Dropdown label="Ticks">
                        <div className="checkbox-field">
                            <label>tick marks</label>
                            <input
                                type="checkbox"
                                value={ticksOn}
                                onChange={handleTicksChange}
                            ></input>
                        </div>
                    </Dropdown>
                </div>
            </Dropdown>

            <Dropdown label="Function">
                <div className="graph-options-container">
                    <div className="text-input-field">
                        <label>f(x) = </label>
                        <input
                            ref={functionInput}
                            placeholder="function"
                        ></input>
                    </div>
                    <div className="checkbox-field">
                        <label>radians</label>
                        <input type="checkbox"></input>
                    </div>
                    <Dropdown label={"Domain / Range"}>
                        <div className="text-input-field">
                            <label>Domain:</label>

                            <input
                                defaultValue={"(-10, 10)"}
                                ref={functionDomain}
                                placeholder="domain (input as interval)"
                            ></input>
                        </div>
                    </Dropdown>
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
                        <label>Grid (m x n)</label>
                        <div>
                            <div>
                                <label>m: </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    step="1"
                                ></input>
                            </div>
                            <div>
                                <label>n: </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="10"
                                    step="1"
                                ></input>
                            </div>
                        </div>
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
            <Dropdown label="Testing">
                <button onClick={PostTest}>Show Current Test</button>
            </Dropdown>
            <div className="Add-layer">
                <button>+</button>
                <select>
                    <option value="Point">Point</option>
                    <option value="Vector">Vector</option>
                    <option value="Shape">Shape</option>
                </select>
            </div>
            <button className="generate-button" onClick={GenerateGraph}>
                Generate
            </button>
        </div>
    );
}

export default GraphComponent;
