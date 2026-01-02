import "../styles/layers-styles.css";

import { useContext, useState } from "react";
import { LayerContext } from "./LayersContext";

import AxisLayer from "../components/GraphChildLayers/AxisLayer";

import GraphPointLayer from "../components/GraphChildLayers/GraphPointLayer";
import FunctionLayer from "../components/GraphChildLayers/FunctionLayer";
import CircleLayer from "../components/GraphChildLayers/CircleLayer";
import RectangleLayer from "../components/GraphChildLayers/RectangleLayer";
import TestLayer from "../components/GraphChildLayers/TestLayer";
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
        // {
        //     label: "Test",
        //     terms: [],
        // },

        {
            label: "Rectangle",
            terms: ["Square", "Polygon", "Quadrilateral"],
        },
        {
            label: "Circle",
            terms: ["Ellipse"],
        },
        {
            label: "Function",
            terms: ["Relation", "Transformation"],
        },
        {
            label: "Points",
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
                        // case "Test":
                        //     return (
                        //         <GraphLayerWrapper
                        //             draggable={true}
                        //             index={index}
                        //             id={layer.id}
                        //         >
                        //             <TestLayer
                        //                 key={layer.id}
                        //                 id={layer.id}
                        //                 isVisible={layer.isVisible}
                        //                 layer={layer}
                        //                 dispatch={dispatch}
                        //             ></TestLayer>
                        //         </GraphLayerWrapper>
                        //     );

                        case "Axis":
                            return (
                                <AxisLayer
                                    key={layer.id}
                                    id={layer.id}
                                    dispatch={dispatch}
                                    layer={layer}
                                ></AxisLayer>
                            );

                        case "Points":
                            return (
                                <GraphLayerWrapper
                                    draggable={true}
                                    index={index}
                                    id={layer.id}
                                >
                                    <GraphPointLayer
                                        key={layer.id}
                                        id={layer.id}
                                        isVisible={layer.isVisible}
                                        dispatch={dispatch}
                                        layer={layer}
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
                                        isVisible={layer.isVisible}
                                        dispatch={dispatch}
                                        layer={layer}
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
                                        isVisible={layer.isVisible}
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
                                        isVisible={layer.isVisible}
                                        layer={layer}
                                        dispatch={dispatch}
                                    ></RectangleLayer>
                                </GraphLayerWrapper>
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
