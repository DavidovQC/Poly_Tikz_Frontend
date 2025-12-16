import "../styles/layers-styles.css";

import { useContext, useState } from "react";
import { LayerContext } from "./LayersContext";

import AxisLayer from "../components/GraphChildLayers/AxisLayer";

import GraphPointLayer from "../components/GraphChildLayers/GraphPointLayer";
import FunctionLayer from "../components/GraphChildLayers/FunctionLayer";
import CircleLayer from "../components/GraphChildLayers/CircleLayer";
import RectangleLayer from "../components/GraphChildLayers/RectangleLayer";
import PathLayer from "../components/GraphChildLayers/PathLayer";
import VectorLayer from "../components/GraphChildLayers/VectorLayer";

import Draggable from "../components/GraphChildLayers/DraggableLayer";
import GraphLayerWrapper from "../components/GraphLayerWrapper";

function Layers({ options }) {
    const { layers, dispatch } = useContext(LayerContext);
    const [layerType, setLayerType] = useState("Point");

    function handleLayerTypeChange(event) {
        setLayerType(event.target.value);
    }

    function addLayer() {
        dispatch({
            type: "add_layer",
            payload: {
                type: layerType,
            },
        });
    }

    return (
        <div>
            <div className="add-layer-options-container">
                <div className="Add-layer">
                    <button
                        className="add-layer-button"
                        onClick={() => {
                            addLayer();
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
                        <option value="Rectangle">Rectangle</option>
                        <option value="Path">Path</option>
                        <option value="Dragable">Dragable</option>
                    </select>
                </div>
            </div>

            {/* Renders the Layer object: */}

            <div className="layers-container">
                {layers.map((layer, index) => {
                    switch (layer.type) {
                        case "Point":
                            return (
                                <GraphLayerWrapper
                                    draggable={true}
                                    index={index}
                                >
                                    <GraphPointLayer
                                        key={layer.id}
                                        id={layer.id}
                                        dispatch={dispatch}
                                    ></GraphPointLayer>
                                </GraphLayerWrapper>
                            );

                        case "Function":
                            return (
                                <GraphLayerWrapper
                                    draggable={true}
                                    index={index}
                                >
                                    <FunctionLayer
                                        key={layer.id}
                                        id={layer.id}
                                        dispatch={dispatch}
                                    ></FunctionLayer>
                                </GraphLayerWrapper>
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
                                <GraphLayerWrapper
                                    draggable={true}
                                    index={index}
                                >
                                    <CircleLayer
                                        key={layer.id}
                                        id={layer.id}
                                        // layer={layer.id}
                                        dispatch={dispatch}
                                    ></CircleLayer>
                                </GraphLayerWrapper>
                            );

                        case "Rectangle":
                            return (
                                <GraphLayerWrapper
                                    draggable={true}
                                    index={index}
                                >
                                    <RectangleLayer
                                        key={layer.id}
                                        id={layer.id}
                                        dispatch={dispatch}
                                    ></RectangleLayer>
                                </GraphLayerWrapper>
                            );
                        case "Path":
                            return (
                                <PathLayer
                                    key={layer.id}
                                    id={layer.id}
                                    dispatch={dispatch}
                                ></PathLayer>
                            );

                        case "Dragable":
                            return (
                                <Draggable
                                    key={layer.id}
                                    id={layer.id}
                                    dispatch={dispatch}
                                ></Draggable>
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
