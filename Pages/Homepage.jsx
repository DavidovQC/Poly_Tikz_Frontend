import "../styles/home-styles.css";

import MainDynamicDropdown from "../components/MainDynamicDropdown";
import Navbar from "../components/Navbar";
import { useContext, useState } from "react";
import { AppContext } from "../src/AppContext";
import SVGDisplay from "../components/SVGDisplay";
import Footer from "../components/Footer";

function Homepage() {
    const { latexCode, svgCode, setSVGCode, mySVG, setMySVG } =
        useContext(AppContext);
    const [wrapTikz, setWrapTikz] = useState(true);

    function handleWrapTikzChange() {
        setWrapTikz(!wrapTikz);
    }

    const displayedTikzText = wrapTikz
        ? `\\begin{document}\n${latexCode}\n\\end{document}`
        : latexCode;

    return (
        <div className="homepage-container">
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
                            <div className="LaTeX-Container">
                                <label>LaTeX code:</label>
                                <div>
                                    <input
                                        type="checkbox"
                                        value={wrapTikz}
                                        defaultChecked={true}
                                        onChange={handleWrapTikzChange}
                                    ></input>
                                    <label>\begin-\end wrap</label>
                                </div>
                            </div>
                            <textarea
                                className="tikz-text-container"
                                rows="15"
                                cols="100"
                                placeholder="LaTeX"
                                value={displayedTikzText}
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
