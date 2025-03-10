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
    const functionInput = useRef(``);
    const xAxisSizeInput = useRef("1");
    const yAxisSizeInput = useRef("1");

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
            function: functionInput.current.value,
            xAxisSize: xAxisSizeInput.current.value,
            yAxisSize: yAxisSizeInput.current.value,
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
                    <button onClick={handleGraphTypeChange} value={"Cross"}>
                        Cross
                    </button>
                    <button onClick={handleGraphTypeChange} value={"L-Shape"}>
                        L-Shape
                    </button>
                    <label>x-axis size</label>
                    <input
                        ref={xAxisSizeInput}
                        type="number"
                        min="0.1"
                        max="10"
                        step=".1"
                    ></input>
                    <label>y-axis size</label>
                    <input
                        ref={yAxisSizeInput}
                        type="number"
                        min="0.1"
                        max="10"
                        step=".1"
                    ></input>
                </div>
            </Dropdown>

            <Dropdown label="Function">
                <div className="graph-options-container">
                    <label>f(x) = </label>
                    <input ref={functionInput} placeholder="function"></input>
                </div>
            </Dropdown>

            <Dropdown label="Grid">
                <div className="Grid-options graph-options-container">
                    <label>grid</label>
                    <input
                        type="checkbox"
                        checked={gridOn}
                        onClick={handleGridChange}
                    ></input>

                    <label>Grid (m x n)</label>
                    <labe>m: </labe>
                    <input type="number" min="1" max="10" step="1"></input>
                    <labe>n: </labe>
                    <input type="number" min="1" max="10" step="1"></input>
                    <labe>length (x): </labe>
                    <input type="number" min="1" max="3" step=".1"></input>
                    <labe>length (y): </labe>
                    <input type="number" min="1" max="3" step=".1"></input>
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
