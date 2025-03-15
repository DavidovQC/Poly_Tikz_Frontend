import "../styles/home-styles.css";

import MainDynamicDropdown from "../components/MainDynamicDropdown";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { AppContext } from "../src/AppContext";
import SVGDisplay from "../components/SVGDisplay";

function Homepage() {
    const { mySVG, setMySVG } = useContext(AppContext);
    return (
        <div>
            <Navbar></Navbar>
            <div className="site-container">
                <MainDynamicDropdown></MainDynamicDropdown>
                <div>
                    <SVGDisplay
                        svg={mySVG}
                        className="SVG-Display"
                    ></SVGDisplay>
                    <div className="output-text-container">
                        <textarea
                            row="40"
                            col="30"
                            placeholder="TiKZ"
                        ></textarea>
                        <input type="text" placeholder="svg"></input>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;
