import { useState } from "react";
import Dropdown from "../Dropdown";

function GraphPointLayer({ dispatch, id, defaultData }) {
    const [xCoordinate, setXCoordinate] = useState(0);
    const [yCoordinate, setYCoordinate] = useState(0);
    const [visible, setVisible] = useState(true);
    const [filled, setFilled] = useState(true);

    function handleChange() {
        dispatch({
            type: "update_layer",
            payload: {
                id: id,
                type: "point",
                xValue: xCoordinate,
                yValue: yCoordinate,
                filled: filled,
                visible: visible,
            },
        });
    }

    function handleXCoordinateChange(event) {
        setXCoordinate(event.target.value);
        handleChange();
    }

    function handleYCoordinateChange(event) {
        setYCoordinate(event.target.value);
        handleChange();
    }

    return (
        <div>
            <div>
                <Dropdown label="Point">
                    <div>
                        <label>Coordinates:</label>
                        <label>x</label>
                        <input
                            type="number"
                            value={xCoordinate}
                            onChange={handleXCoordinateChange}
                        ></input>
                        <label>y</label>
                        <input
                            type="number"
                            value={yCoordinate}
                            onChange={handleYCoordinateChange}
                        ></input>
                    </div>
                </Dropdown>
            </div>
        </div>
    );
}

export default GraphPointLayer;
