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
            <div>
                <label>Vector start:</label>
                <input
                    type="text"
                    onChange={handleCoordinateChange}
                    value={coordinate}
                ></input>
            </div>

            <div>
                <label>Vector end:</label>
                <input
                    type="text"
                    onChange={handleCoordinateChange}
                    value={coordinate}
                ></input>
            </div>
        </Dropdown>
    );
}

export default VectorLayer;
