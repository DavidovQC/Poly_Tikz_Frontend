import "../styles/layers-styles.css";

import { useContext, useState } from "react";
import { LayerContext } from "./LayersContext";

import AxisLayer from "../components/GraphChildLayers/AxisLayer";

import GraphPointLayer from "../components/GraphChildLayers/GraphPointLayer";
import FunctionLayer from "../components/GraphChildLayers/FunctionLayer";
import CircleLayer from "../components/GraphChildLayers/CircleLayer";
import RectangleLayer from "../components/GraphChildLayers/RectangleLayer";
import PathLayer from "../components/GraphChildLayers/PathLayer";

import GraphLayerWrapper from "../components/GraphLayerWrapper";
import LayerSearchbar from "../components/SiteComponents/LayerSearchbar";
import AddLayerButton from "../components/Buttons/AddLayerButton";

function Layers({ options }) {
    const { layers, dispatch } = useContext(LayerContext);
    const [layerType, setLayerType] = useState("");

    function handleLayerTypeChange(option) {
        setLayerType(option.label);
        console.log(`Type is ` + layerType);
    }

    function addLayer() {
        dispatch({
            type: "add_layer",
            payload: {
                type: layerType,
            },
        });
    }

    function handleAddLayer(option) {
        if (
            graphOptions.some(
                (option) =>
                    option.label.toLowerCase() === layerType.toLowerCase()
            )
        ) {
            addLayer();
        }
    }

    const graphOptions = [
        {
            label: "Rectangle",
            terms: ["Square", "Polygon", "Quadrilateral", "Diamond"],
        },
        {
            label: "Circle",
            terms: ["Ellipse", "Round"],
        },
        {
            label: "Function",
            terms: ["Relation", "Transformation"],
        },
        {
            label: "Point",
            terms: ["Node", "Label"],
        },
    ];

    return (
        <div>
            <div className="add-layer-options-container">
                <AddLayerButton
                    buttonText={"+"}
                    onClickFunction={handleAddLayer}
                ></AddLayerButton>

                <LayerSearchbar
                    options={graphOptions}
                    onSelectionFunction={handleLayerTypeChange}
                    query={layerType}
                    setQuery={setLayerType}
                ></LayerSearchbar>
            </div>

            <div className="layers-container">
                {layers.map((layer, index) => {
                    switch (layer.type) {
                        case "Axis":
                            return (
                                <AxisLayer
                                    key={layer.id}
                                    id={layer.id}
                                    dispatch={dispatch}
                                ></AxisLayer>
                            );

                        case "Point":
                            return (
                                <GraphLayerWrapper
                                    draggable={true}
                                    index={index}
                                    id={layer.id}
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
                                    id={layer.id}
                                >
                                    <FunctionLayer
                                        key={layer.id}
                                        id={layer.id}
                                        dispatch={dispatch}
                                    ></FunctionLayer>
                                </GraphLayerWrapper>
                            );

                        case "Circle":
                            return (
                                <GraphLayerWrapper
                                    draggable={true}
                                    index={index}
                                    id={layer.id}
                                >
                                    <CircleLayer
                                        key={layer.id}
                                        id={layer.id}
                                        layer={layer}
                                        dispatch={dispatch}
                                    ></CircleLayer>
                                </GraphLayerWrapper>
                            );

                        case "Rectangle":
                            return (
                                <GraphLayerWrapper
                                    draggable={true}
                                    index={index}
                                    id={layer.id}
                                >
                                    <RectangleLayer
                                        key={layer.id}
                                        id={layer.id}
                                        layer={layer}
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
