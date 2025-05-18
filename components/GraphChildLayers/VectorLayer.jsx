import { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import InfoLabel from "../InfoLabel";

function VectorLayer({ id, dispatch }) {
    const [coordinate, setCoordinate] = useState("(1, 1)");

    function handleCoordinateChange(e) {
        setCoordinate(e.target.value);
    }

    useEffect(() => {
        dispatch({
            type: "edit_layer",
            newLayer: {
                type: "Vector",
                id: id,
                coordinate: coordinate,
            },
        });
    }, [coordinate]);

    return (
        <Dropdown label="Vector">
            <InfoLabel
                labelName="Label"
                infoText="This is info text This is info text This is info text This is info text "
            ></InfoLabel>

            {/* <input
                type="text"
                onChange={handleCoordinateChange}
                value={coordinate}
            ></input> */}
        </Dropdown>
    );
}

export default VectorLayer;
