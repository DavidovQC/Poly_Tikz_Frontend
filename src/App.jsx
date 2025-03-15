//Done:

//Add function input  [DONE, 2/28]
//put each component of graph layer into a dropdown  [DONE, 2/28]
//create navbar [DONE, 3/13]
//improve/clean up current styling
//add textboxes for return latex and svg code

//To do:
//organize/modularize server code (tomorrow)
//refactor homepage
//add layers to graph component
//make svg container an internal window should the svg overflow (tomorrow)
//implement mathjax for matrices and tables

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

    return (
        <AppContext.Provider
            value={{ mySVG, setMySVG, selectedOption, setSelectedOption }}
        >
            <Homepage></Homepage>
        </AppContext.Provider>
    );
}

export default App;
