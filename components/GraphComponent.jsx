import { useContext, useState, useEffect } from "react";

import { AppContext } from "../src/AppContext";
import { LayerContext } from "../Layers/LayersContext";
import Layers from "../Layers/Layers";

import "../styles/graph-component-styles.css";
import GenerateButton from "./GenerateButton";

import symbolsSVG from "../assets/SVGSymbols";
import TikzContainer from "./TikzContainer";

function GraphComponent() {
    const { latexCode, setLatexCode, setSVGCode, setMySVG, setIsLoading } =
        useContext(AppContext);
    const { layers, dispatch } = useContext(LayerContext);
    const [value, setValue] = useState("");

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

    async function GenerateGraph() {
        setIsLoading(true);
        console.log(`Graph data: ${JSON.stringify(layers)}`);

        try {
            const response = await fetch(
                // "http://localhost:3000/api/getGraphSVGv2",
                "https://poly-tikz-backend.onrender.com/api/getGraphSVGv2",
                {
                    method: "POST",
                    body: JSON.stringify(layers),
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Server error");
            }

            const data = await response.json();
            const newSVG = data.SVG;
            setLatexCode(data.TikZ);
            setSVGCode(data.SVG);
            setMySVG(newSVG);
        } catch (err) {
            setLatexCode("Error, check inputs.");
            setSVGCode("Error, check inputs.");
            setMySVG(symbolsSVG[0].svg);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="graph-component-container">
            <Layers></Layers>
            <div className="generate-graph-button-container">
                <GenerateButton buttonFunction={GenerateGraph}></GenerateButton>
            </div>
            {/* <div>
                <TikzContainer
                    value={latexCode}
                    setValue={setLatexCode}
                ></TikzContainer>
            </div> */}
        </div>
    );
}

export default GraphComponent;
