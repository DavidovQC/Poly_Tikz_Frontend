import { useContext, useState } from "react";
import GraphPointLayer from "../components/GraphChildLayers/GraphPointLayer";
import { LayerContext } from "./LayersContext";
import FunctionLayer from "../components/GraphChildLayers/FunctionLayer";
import AxisLayer from "../components/GraphChildLayers/AxisLayer";
import "../styles/layers-styles.css";
import CircleLayer from "../components/GraphChildLayers/CircleLayer";
import VectorLayer from "../components/GraphChildLayers/VectorLayer";

function Layers({ options }) {
    const { layers, dispatch } = useContext(LayerContext);
    const [layerType, setLayerType] = useState("Point");

    function handleLayerTypeChange(event) {
        setLayerType(event.target.value);
    }

    return (
        <div>
            <div className="add-layer-options-container">
                <div className="Add-layer">
                    <button
                        className="add-layer-button"
                        onClick={() => {
                            console.log(`${layerType}`);
                            dispatch({
                                type: "add_layer",
                                payload: {
                                    type: layerType,
                                },
                            });
                        }}
                    >
                        +
                    </button>

                    <select
                        onChange={handleLayerTypeChange}
                        className="options-select"
                    >
                        <option value="Point">Point</option>
                        {/* <option value="Node">Node</option> */}
                        <option value="Function">Function</option>

                        <option value="Circle">Circle</option>
                        {/* <option value="Vector">Vector</option> */}
                        {/* <option value="Rectangle">Rectangle</option>
                        <option value="Line Segment">Line Segment</option> */}

                        {/* {options.map((option) => {
                        return <option value={option}>{option}</option>;
                    })} */}
                    </select>
                </div>
            </div>
            <div className="layers-container">
                {layers.map((layer) => {
                    switch (layer.type) {
                        case "Point":
                            return (
                                <GraphPointLayer
                                    key={layer.id}
                                    id={layer.id}
                                    dispatch={dispatch}
                                ></GraphPointLayer>
                            );

                        case "Function":
                            return (
                                <FunctionLayer
                                    key={layer.id}
                                    id={layer.id}
                                    dispatch={dispatch}
                                ></FunctionLayer>
                            );

                        case "Axis":
                            return (
                                <AxisLayer
                                    key={layer.id}
                                    id={layer.id}
                                    dispatch={dispatch}
                                ></AxisLayer>
                            );

                        case "Circle":
                            return (
                                <CircleLayer
                                    key={layer.id}
                                    id={layer.id}
                                    // layer={layer.id}
                                    dispatch={dispatch}
                                ></CircleLayer>
                            );
                        case "Vector":
                            return (
                                <VectorLayer
                                    key={layer.id}
                                    id={layer.id}
                                    dispatch={dispatch}
                                ></VectorLayer>
                            );
                        default:
                            console.log("error while mapping");
                            return;
                    }
                })}
            </div>
        </div>
    );
}

export default Layers;
