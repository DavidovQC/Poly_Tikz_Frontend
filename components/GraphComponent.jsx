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
    const xAxisSizeInput = useRef(1);
    const yAxisSizeInput = useRef(1);
    const mGridSize = useRef("1");
    const nGridSize = useRef("1");
    const gridStep = useRef(1);
    const functionDomain = useRef("(-1, 1)");
    const ticksStep = useRef(1);

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
            TicksOn: ticksOn,
            TicksStep: ticksStep.current.value,
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
                    </Dropdown>
                    <Dropdown label="Custom"></Dropdown>
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
                    <Dropdown label={"Domain / Range"}>
                        <div className="text-input-field">
                            <label>Domain:</label>

                            <input
                                defaultValue={"(-10, 10)"}
                                ref={functionDomain}
                            ></input>
                        </div>
                        <div className="text-input-field">
                            {" "}
                            <label>Range:</label>
                            <input defaultValue={"(-10, 10)"}></input>
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
            <Dropdown label="Window">{/* clipping */}</Dropdown>
            <Dropdown label="Testing">
                <button onClick={PostTest}>Show Current Test</button>
            </Dropdown>

            <div className="Add-layer">
                <button>+</button>
                <select>
                    <option value="Point">Point</option>
                    <option value="Vector">Vector</option>
                    <option value="Function">Function</option>
                    <option value="Shape">Shape</option>
                    <option value="Piecewise">Piecewise</option>
                    <option value="Riemann-Sum">Riemann Sum</option>
                </select>
            </div>
            <button className="generate-button" onClick={GenerateGraph}>
                Generate
            </button>
        </div>
    );
}

export default GraphComponent;
