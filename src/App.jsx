//Done:

//Add function input  [DONE, 2/28]
//put each component of graph layer into a dropdown  [DONE, 2/28]
//create navbar [DONE, 3/13]
//improve/clean up current styling
//add textboxes for return latex and svg code
//refactor homepage
//make svg container an internal window should the svg overflow
//add layers to graph component
//organize/modularize server code

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
import { useState } from "react";
import { AppContext } from "./AppContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import About from "../Pages/About";
import Contact from "../Pages/Contact";

function App() {
    const [selectedOption, setSelectedOption] = useState("Graph");
    const [mySVG, setMySVG] = useState();
    const [svgCode, setSVGCode] = useState(``);
    const [latexCode, setLatexCode] = useState(``);

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
