import { useContext, useState, useEffect } from "react";
import Dropdown from "./Dropdown";

import { AppContext } from "../src/AppContext";
import { LayerContext } from "../Layers/LayersContext";
import Layers from "../Layers/Layers";

import "../styles/graph-component-styles.css";
import GenerateButton from "./GenerateButton";

function GraphComponent() {
    const { setLatexCode, setSVGCode, setMySVG } = useContext(AppContext);
    const { layers, dispatch } = useContext(LayerContext);

    useEffect(() => {
        dispatch({
            type: "add_layer",
            payload: { type: "Axis" },
        });

        return () => {
            dispatch({
                type: "delete_all_layers",
                payload: {},
            });
        };
    }, []);

    async function GenerateGraph() {
        console.log(`Graph data: ${JSON.stringify(layers)}`);

        const response = await fetch(
            "http://localhost:3000/api/getGraphSVGv2",
            // "https://poly-tikz-backend.onrender.com/api/getGraphSVGv2",
            {
                method: "POST",
                body: JSON.stringify(layers),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

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
            {/* <Dropdown label="Testing">
                <button onClick={PostTest}>Show Current Test</button>
            </Dropdown> */}

            <Layers></Layers>
            <div className="generate-graph-button-container">
                <GenerateButton buttonFunction={GenerateGraph}></GenerateButton>
            </div>
        </div>
    );
}

export default GraphComponent;
