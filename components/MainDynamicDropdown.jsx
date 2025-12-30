import "../styles/main-dynamic-dropdown-styles.css";
import { useContext } from "react";
import GraphComponent from "./GraphComponent";
import { AppContext } from "../src/AppContext";
import { LayersProvider } from "../Layers/LayersContext";
import DropdownInputField from "./InputWidgets/DropdownInputField";

function MainDynamicDropdown() {
    const { selectedOption, setSelectedOption } = useContext(AppContext);
    const { tikzData, setTikzData } = useContext(AppContext);

    function changeOption(event) {
        setSelectedOption(event.target.value);
        setTikzData((tikzData) => ({ ...tikzData, type: event.target.value }));
    }

    const dropdownOptions = [
        { value: "Graph", label: "Graph" },
        { value: "Table", label: "Table" },
    ];

    return (
        <div className="options-container">
            <div className="selection-container">
                {/* <DropdownInputField
                    values={dropdownOptions}
                    onSelectFunction={changeOption}
                    label={"Workspace: "}
                ></DropdownInputField> */}
                {/* <select value={selectedOption} onChange={changeOption}>
                    <option value="Graph">Graph</option>
                    <option value="Table">Table</option>
                </select> */}
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
