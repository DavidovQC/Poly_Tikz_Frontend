import { useContext, useState, useEffect } from "react";
import Dropdown from "./Dropdown";

import { AppContext } from "../src/AppContext";
import { LayerContext } from "../Layers/LayersContext";
import Layers from "../Layers/Layers";
import { useRef } from "react";
import "../styles/graph-component-styles.css";

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

    async function genGraphV2() {
        const graphData = layers;
        const response = await fetch(
            "http://localhost:3000/api/getGraphSVGv2",
            {
                method: "POST",
                body: JSON.stringify(graphData),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await response.json();
        console.log(data);
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
            <button onClick={genGraphV2}>V2 test</button>

            <Dropdown label="Testing">
                <button onClick={PostTest}>Show Current Test</button>
            </Dropdown>

            <Layers></Layers>
        </div>
    );
}

export default GraphComponent;
