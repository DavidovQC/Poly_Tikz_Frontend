import "../styles/home-styles.css";

import MainDynamicDropdown from "../components/MainDynamicDropdown";
import Navbar from "../components/Navbar";
// import { useContext } from "react";
// useContext
function Homepage() {
    return (
        <div>
            <Navbar></Navbar>
            <div className="site-container">
                <MainDynamicDropdown></MainDynamicDropdown>
            </div>
        </div>
    );
}

export default Homepage;
