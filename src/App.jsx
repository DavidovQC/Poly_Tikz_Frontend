//To do:
//implement mathjax for matrices and tables

//load presets (e.g, y=x, y = |x|, y=sin(x), y=e^x)
//Pallette for functions (sin, cos, e)
//implement visible/invisible layer
//Add function to cleanup input of function
//Color picker

//sign-in
//side bar with prev generations

import "./App.css";
import { useState, useRef, useContext } from "react";
import { AppContext } from "./AppContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import About from "../Pages/About";
import Contact from "../Pages/Contact";

import { createGraphLayer } from "../evaluation/TikzGraphMethods";

function App() {
    const [latexCode, setLatexCode] = useState(``);

    const [selectedOption, setSelectedOption] = useState("Graph");
    const [mySVG, setMySVG] = useState();
    const [svgCode, setSVGCode] = useState(``);

    const [isLoading, setIsLoading] = useState(false);

    const outputRef = useRef(null);
    const debounceTimer = useRef(null);
    const debouncePending = useRef(false);

    // function update() {
    //     console.log("update() called!");
    //     console.log("layers object:\n");
    //     console.log(JSON.stringify(layers));

    //     console.log("createGraphLayers(layers):\n");
    //     console.log(createGraphLayer(layers));

    //     setLatexCode(createGraphLayer(layers));

    //     const currentCode = latexCode;

    //     if (!outputRef.current) return;

    //     const s = document.createElement("script");
    //     s.type = "text/tikz";
    //     s.setAttribute("data-show-console", "true");
    //     s.textContent = currentCode;

    //     outputRef.current.innerHTML = "";
    //     outputRef.current.appendChild(s);
    //     console.log("outputRef edited \n");
    //     console.log(outputRef.current);

    //     extractSVG();
    // }

    function extractSVG() {
        if (!outputRef.current) return;

        const svg = outputRef.current.querySelector("svg");
        if (!svg) return;
        setMySVG(svg);

        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svg);
        console.log("SVG is:\n");
        console.log(svgString);
        setSVGCode(svgString);
    }

    return (
        <AppContext.Provider
            value={{
                svgCode,
                setSVGCode,

                latexCode,
                setLatexCode,

                mySVG,
                setMySVG,

                selectedOption,
                setSelectedOption,

                isLoading,
                setIsLoading,

                outputRef,
            }}
        >
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/About" element={<About />} />
                    <Route path="/Contact" element={<Contact />} />
                </Routes>
            </Router>
        </AppContext.Provider>
    );
}

export default App;
