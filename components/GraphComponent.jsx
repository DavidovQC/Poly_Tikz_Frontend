import { useContext, useState, useEffect } from "react";

import { AppContext } from "../src/AppContext";
import { LayerContext } from "../Layers/LayersContext";
import Layers from "../Layers/Layers";

import "../styles/graph-component-styles.css";

import TikzContainer from "./TikzContainer";

function GraphComponent() {
    const { latexCode, setLatexCode, setSVGCode, setMySVG, setIsLoading } =
        useContext(AppContext);
    const { layers, dispatch } = useContext(LayerContext);

    useEffect(() => {
        dispatch({
            type: "add_layer",
            payload: { type: "Axis" },
        });

        console.log("Initial created");
        return () => {
            dispatch({
                type: "delete_all_layers",
                payload: {},
            });
        };
    }, []);

    // function generateGraphv2() {
    //     setLatexCode(createGraphLayer(layers));
    // }

    return (
        <div className="graph-component-container">
            <Layers></Layers>
            <div className="generate-graph-button-container">
                {/* <GenerateButton
                    buttonFunction={generateGraphv2}
                ></GenerateButton> */}
            </div>
            <div>
                <TikzContainer
                    value={latexCode}
                    setSVG={setMySVG}
                    setValue={setLatexCode}
                ></TikzContainer>
            </div>
        </div>
    );
}

export default GraphComponent;
