import { useContext } from "react";
import "./styles/main-dynamic-dropdown-styles.css";
import GraphComponent from "./GraphComponent";
import { AppContext } from "../src/AppContext";

function MainDynamicDropdown() {
    const { selectedOption, setSelectedOption } = useContext(AppContext);
    const { tikzData, setTikzData } = useContext(AppContext);

    function changeOption(event) {
        setSelectedOption(event.target.value);
        setTikzData((tikzData) => ({ ...tikzData, type: event.target.value }));
    }

    return (
        <div className="options-container">
            <div className="selection-container">
                Select an option:
                <select value={selectedOption} onChange={changeOption}>
                    <option value="Graph">Graph</option>
                    <option value="Table">Table</option>
                </select>
            </div>
            <div className="to-center">
                {selectedOption == "Graph" && <GraphComponent />}
                {selectedOption == "Table" && <p>Table Chosen</p>}
            </div>
        </div>
    );
}

export default MainDynamicDropdown;
