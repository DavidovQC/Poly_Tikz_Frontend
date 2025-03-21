import { useReducer, useContext, useState } from "react";
import Dropdown from "./Dropdown";
import GraphPointLayer from "./GraphChildLayers/GraphPointLayer";
import { AppContext } from "../src/AppContext";
import { useRef } from "react";
import "../styles/graph-component-styles.css";
import VectorLayer from "./GraphChildLayers/VectorLayer";

function GraphComponent() {
    const { setLatexCode, setSVGCode, setMySVG } = useContext(AppContext);

    //layer data type: { id, type, visible, ...data,  }

    function reducer(layers, action) {
        switch (action.type) {
            case "add_layer":
                console.log(layers);
                return [...layers, newLayer(action.payload.type, Date.now())];

            case "update_layer":
                console.log(layers);
                return layers.map((layer) =>
                    layer.id == action.payload.id ? action.payload : layer
                );
            case "toggle_visible":

            default:
                return layers;
        }
    }

    function newLayer(type, id) {
        switch (type) {
            case "point":
                return {
                    id: id,
                    type: "point",
                    data: {
                        xValue: 0,
                        yValue: 0,
                        filled: true,
                        visible: true,
                    },
                };
            case "vector":
                return {
                    id: id,
                    type: "vector",
                    data: {
                        xValue: 0,
                        yValue: 0,
                        arrow: true,
                        visible: true,
                    },
                };
            default:
                console.log("not specified");
                return null;
        }
    }

    //Graph contents
    const [layers, dispatch] = useReducer(reducer, []);
    //I’m thinking of just giving up and keeping a JS object
    //in the parent component with the {id, type, values} and updating these with each change to the component
    const [data, setData] = useState([]);

    const [graphType, setGraphType] = useState("Cross");
    const [gridOn, setGridOn] = useState(false);
    const [ticksOn, setTicksOn] = useState(false);
    const functionInput = useRef(``);
    const xAxisSizeInput = useRef(1);
    const yAxisSizeInput = useRef(1);
    const gridStep = useRef(1);
    const functionDomain = useRef("(-1, 1)");
    const ticksStep = useRef(1);
    const [layerType, setLayerType] = useState("Point");

    function handleTicksChange() {
        setTicksOn(!ticksOn);
    }

    function handleGraphTypeChange(event) {
        setGraphType(event.target.value);
    }

    function handleGridChange() {
        setGridOn(!gridOn);
    }

    function handleLayerTypeChange(event) {
        setLayerType(event.target.value);
    }

    function updateLayer(id, type, newValues) {
        switch (type) {
            case "Point":
                setLayers((prevLayers) =>
                    prevLayers.map((layer) =>
                        layer.id === id ? (
                            <GraphPointLayer
                                xValue={newValues.x}
                                yValue={newValues.y}
                            />
                        ) : (
                            layer
                        )
                    )
                );
            default:
                console.log("Error");
        }
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

        const data = await response.json();
        const newSVG = data.SVG;
        setLatexCode(data.TikZ);
        setSVGCode(data.SVG);
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

                            <input
                                defaultValue={"(-10, 10)"}
                                ref={functionDomain}
                            ></input>
                        </div>
                        <div className="text-input-field">
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
                <button
                    onClick={() =>
                        dispatch({
                            type: "add_layer",
                            payload: { type: "point" },
                        })
                    }
                >
                    +
                </button>
                <select onChange={handleLayerTypeChange}>
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

            <div>
                {layers.map((layer) => {
                    return (
                        <GraphPointLayer
                            key={layer.id}
                            id={layer.id}
                            dispatch={dispatch}
                            defaultData={layer.data}
                        ></GraphPointLayer>
                    );
                })}
            </div>
        </div>
    );
}

export default GraphComponent;
