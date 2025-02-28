import { useContext, useState } from "react";
import "./styles/main-options-container-styles.css";
import SVGButton from "./SVGButton";
import SVGButtonArray from "./SVGButtonArray";
import Dropdown from "./Dropdown";
import { AppContext } from "../src/AppContext";
import { svgData } from "../assets/SVGButtonData";
import { useRef } from "react";

function GraphComponent() {
    const { mySVG, setMySVG } = useContext(AppContext);

    const [graphType, setGraphType] = useState("Cross");
    const [gridOn, setGridOn] = useState(false);
    const functionInput = useRef(``);

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
        <>
            <div>
                Axes
                <Dropdown>
                    <div className="Axis-options">
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
                </Dropdown>
                Function
                <Dropdown>
                    <div>
                        <label>f(x) = </label>
                        <input
                            ref={functionInput}
                            placeholder="function"
                        ></input>
                    </div>
                </Dropdown>
                Grid
                <Dropdown>
                    <div className="Grid-options">
                        <label>grid</label>
                        <input
                            type="checkbox"
                            value="Grid"
                            onClick={handleGridChange}
                        ></input>

                        <label>x-axis scale</label>
                        <input type="number" id="x-axis-scale"></input>
                    </div>
                </Dropdown>
                Testing
                <Dropdown>
                    <button onClick={PostTest}>Show Current Test</button>
                </Dropdown>
                <button onClick={GenerateGraph}>Generate</button>
                <div className="Add-layer">
                    <button>+</button>
                    <select>
                        <option value="Point">Point</option>
                        <option value="Vector">Vector</option>
                        <option value="Shape">Shape</option>
                    </select>
                </div>
            </div>
        </>
    );
}

export default GraphComponent;
