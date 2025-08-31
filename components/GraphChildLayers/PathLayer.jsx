import { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import TextInputField from "../InputWidgets/TextInputField";
import CheckboxInputField from "../InputWidgets/CheckboxInputField";

function PathLayer({ dispatch, id }) {
    const [pathPoints, setPathPoints] = useState("");
    const [nodesVisible, setNodesVisible] = useState(false);

    function handlePathPointsChange(e) {
        setPathPoints(e.target.value);
    }

    function handleNodesVisibleChange(e) {
        setNodesVisible(!nodesVisible);
    }

    useEffect(() => {
        dispatch({
            type: "edit_layer",
            newLayer: {
                id: id,
                type: "Path",
                points: pathPoints,
                nodesVisible: nodesVisible,
            },
        });
    }, [pathPoints, nodesVisible]);

    return (
        <Dropdown label="Linear Path">
            <div>
                <TextInputField
                    label={"Points: "}
                    value={pathPoints}
                    onChangeFunction={handlePathPointsChange}
                ></TextInputField>
            </div>

            <Dropdown label={"Vertices"}>
                <div>
                    <CheckboxInputField
                        label={"Vertices"}
                        value={nodesVisible}
                        onChangeFunction={handleNodesVisibleChange}
                    ></CheckboxInputField>
                </div>
            </Dropdown>

            <Dropdown label={"Edges"}></Dropdown>
        </Dropdown>
    );
}

export default PathLayer;
