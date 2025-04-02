import "../styles/main-dynamic-dropdown-styles.css";
import { useContext } from "react";
import GraphComponent from "./GraphComponent";
import { AppContext } from "../src/AppContext";
import { LayersProvider } from "../Layers/LayersContext";

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
                <select value={selectedOption} onChange={changeOption}>
                    <option value="Graph">Graph</option>
                    {/* <option value="Table">Table</option>
                    <option value="Venn-Diagram">Venn Diagram</option>
                    <option value="Lienar-Transform">Linear Transform</option> */}
                </select>
            </div>
            <div className="to-center">
                {selectedOption == "Graph" && (
                    <LayersProvider>
                        <GraphComponent />
                    </LayersProvider>
                )}
                {selectedOption == "Table" && <p>Table Chosen</p>}
            </div>
        </div>
    );
}

export default MainDynamicDropdown;
