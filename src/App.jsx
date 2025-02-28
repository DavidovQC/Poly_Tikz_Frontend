//To do:
//Add layers (vectors, points, ...)
//Add function input (today) [DONE, 2/28]
//put each component of graph layer into a dropdown (today) [DONE, 2/28]
//Add function to cleanup input of function
//Color picker
//Pallette for functions
//sign-in
//side bar with prev generations
//organize/modularize server code
//make svg container an internal window should the svg overflow

import "./App.css";
import SVGDisplay from "../components/SVGDisplay";
import MainDynamicDropdown from "../components/MainDynamicDropdown";
import { useState } from "react";
import { AppContext } from "./AppContext";

function App() {
    //Selected Option
    const [selectedOption, setSelectedOption] = useState("Graph");
    const [mySVG, setMySVG] = useState();

    // getSVGData();

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
