import { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import TextInputField from "../InputWidgets/TextInputField";

function PathLayer() {
    const [pathPoints, setPathPoints] = useState("");

    function handlePathPointsChange(e) {
        setPathPoints(e.target.value);
    }

    useEffect(() => {}, [pathPoints]);

    return (
        <Dropdown label="Path">
            <div>
                <TextInputField
                    label={"Points"}
                    value={pathPoints}
                    onChangeFunction={handlePathPointsChange}
                ></TextInputField>
            </div>
        </Dropdown>
    );
}

export default PathLayer;
