//Done:

//Add function input  [DONE, 2/28]
//put each component of graph layer into a dropdown  [DONE, 2/28]

//To do:
//create navbar (tomorrow)
//improve/clean up current styling (tomorrow)
//organize/modularize server code (tomorrow)
//add textboxes for return latex and svg code (tomorrow)

//For Domain/Range add clipping options for before the function!
//Venn Diagram

//add layers to graph component
//load presets (e.g, y=x, y = |x|, y=sin(x), y=e^x)
//make svg container an internal window should the svg overflow (tomorrow)
//implement mathjax for matrices and tables
//implement visible/invisible layer
//Add function to cleanup input of function
//Color picker
//Pallette for functions (sin, cos, e)
//Add layers (vectors, points, ...)
//sign-in
//side bar with prev generations

import "./App.css";
import "../styles/home-styles.css";
import SVGDisplay from "../components/SVGDisplay";
import MainDynamicDropdown from "../components/MainDynamicDropdown";
import { useState } from "react";
import { AppContext } from "./AppContext";

import Homepage from "../Pages/Homepage";

function App() {
    const [selectedOption, setSelectedOption] = useState("Graph");
    const [mySVG, setMySVG] = useState();

    return (
        <AppContext.Provider
            value={{ mySVG, setMySVG, selectedOption, setSelectedOption }}
        >
            <Homepage></Homepage>
            <div className="site-container">
                <MainDynamicDropdown />

                <div className="output-container">
                    <SVGDisplay svg={mySVG} className="SVG-Display" />
                    <div className="output-text-container">
                        <input type="text" placeholder="TiKZ"></input>
                        <input type="text" placeholder="svg"></input>
                    </div>
                </div>
            </div>
        </AppContext.Provider>
    );
}

export default App;
