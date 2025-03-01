//To do:

//Add function input  [DONE, 2/28]
//put each component of graph layer into a dropdown  [DONE, 2/28]
//add navbar (tomorrow)
//improve navbar (tomorrow)
//improve/clean up current styling (tomorrow)
//organize/modularize server code (tomorrow)
//load presets (e.g, y=x, y = |x|, y=sin(x), y=e^x)
//stylize graph component
//add textboxes for return latex and svg code
//make svg container an internal window should the svg overflow
//implement mathjax for matrices and tables
//implement visible/invisible layer
//Add function to cleanup input of function
//Color picker
//Pallette for functions (sin, cos, e)
//Add layers (vectors, points, ...)
//sign-in
//side bar with prev generations

import "./App.css";
import SVGDisplay from "../components/SVGDisplay";
import MainDynamicDropdown from "../components/MainDynamicDropdown";
import { useState } from "react";
import { AppContext } from "./AppContext";

function App() {
    const [selectedOption, setSelectedOption] = useState("Graph");
    const [mySVG, setMySVG] = useState();

    return (
        <AppContext.Provider
            value={{ mySVG, setMySVG, selectedOption, setSelectedOption }}
        >
            <div className="site-container">
                <MainDynamicDropdown />

                <SVGDisplay svg={mySVG} className="SVG-Display" />
            </div>
        </AppContext.Provider>
    );
}

export default App;
