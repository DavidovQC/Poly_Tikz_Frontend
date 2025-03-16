import "../styles/home-styles.css";

import MainDynamicDropdown from "../components/MainDynamicDropdown";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AppContext } from "../src/AppContext";
import SVGDisplay from "../components/SVGDisplay";

function Homepage() {
    const { latexCode, svgCode, mySVG, setMySVG } = useContext(AppContext);
    return (
        <div>
            <Navbar></Navbar>
            <div className="main-container">
                <MainDynamicDropdown></MainDynamicDropdown>
                <div className="output-container">
                    <SVGDisplay
                        svg={mySVG}
                        className="SVG-Display"
                    ></SVGDisplay>
                    <div className="output-text-container">
                        <div className="tikz-section">
                            <label>LaTeX code:</label>
                            <textarea
                                className="tikz-text-container"
                                rows="10"
                                cols="75"
                                placeholder="LaTeX"
                                value={latexCode}
                            ></textarea>
                        </div>
                        <div className="svg-section">
                            <label>svg code:</label>
                            <textarea
                                type="text"
                                rows="10"
                                cols="75"
                                placeholder="svg"
                                value={svgCode}
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;
