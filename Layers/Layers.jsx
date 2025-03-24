import { useContext, useState } from "react";
import GraphPointLayer from "../components/GraphChildLayers/GraphPointLayer";
import { LayerContext } from "./LayersContext";
import FunctionLayer from "../components/GraphChildLayers/FunctionLayer";
import AxisLayer from "../components/GraphChildLayers/AxisLayer";
function Layers({ options }) {
    const { layers, dispatch } = useContext(LayerContext);
    const [layerType, setLayerType] = useState("Point");

    function handleLayerTypeChange(event) {
        setLayerType(event.target.value);
    }

    return (
        <div>
            <div className="Add-layer">
                <select onChange={handleLayerTypeChange}>
                    <option value="Point">Point</option>
                    <option value="Circle">Node</option>
                    <option value="Function">Function</option>
                    <option value="Circle">Circle</option>
                    <option value="Rectangle">Rectangle</option>
                    <option value="Line Segment">Line Segment</option>

                    {/* {options.map((option) => {
                        return <option value={option}>{option}</option>;
                    })} */}
                </select>
            </div>

            <button
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

            <div>
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
