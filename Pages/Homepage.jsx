import "../styles/home-styles.css";

import MainDynamicDropdown from "../components/MainDynamicDropdown";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AppContext } from "../src/AppContext";
import SVGDisplay from "../components/SVGDisplay";
import Footer from "../components/Footer";

function Homepage() {
    const { latexCode, svgCode, mySVG, setMySVG } = useContext(AppContext);
    return (
        <div>
            <Navbar></Navbar>
            <div className="main-container">
                <MainDynamicDropdown></MainDynamicDropdown>
                <div className="output-container">
                    <div className="svg-image-container">
                        <SVGDisplay
                            svg={mySVG}
                            className="SVG-Display"
                        ></SVGDisplay>
                    </div>
                    <div className="output-text-container">
                        <div className="tikz-section">
                            <label>LaTeX code:</label>
                            <textarea
                                className="tikz-text-container"
                                rows="15"
                                cols="100"
                                placeholder="LaTeX"
                                value={latexCode}
                            ></textarea>
                        </div>
                        <div className="svg-section">
                            <label>svg code:</label>
                            <textarea
                                className="svg-text-container"
                                rows="15"
                                cols="100"
                                placeholder="svg"
                                value={svgCode}
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Homepage;
