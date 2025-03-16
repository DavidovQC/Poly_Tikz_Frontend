//Done:

//Add function input  [DONE, 2/28]
//put each component of graph layer into a dropdown  [DONE, 2/28]
//create navbar [DONE, 3/13]
//improve/clean up current styling
//add textboxes for return latex and svg code
//refactor homepage
//make svg container an internal window should the svg overflow

//To do:

//add layers to graph component
//add Venn-Diagram

//implement mathjax for matrices and tables (primarily tables)
//organize/modularize server code (tomorrow)

//For Domain/Range add clipping options for before the function!
//Venn Diagram

//load presets (e.g, y=x, y = |x|, y=sin(x), y=e^x)
//Pallette for functions (sin, cos, e)

//implement visible/invisible layer
//Add function to cleanup input of function
//Color picker

//Add layers (vectors, points, ...)

//sign-in
//side bar with prev generations

import "./App.css";
import { useState } from "react";
import { AppContext } from "./AppContext";
import Homepage from "../Pages/Homepage";

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
            <Homepage></Homepage>
        </AppContext.Provider>
    );
}

export default App;
