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
    const [isLoading, setIsLoading] = useState(false);

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
