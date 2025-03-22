import { useState } from "react";
import Dropdown from "../Dropdown";
import { useEffect } from "react";

function GraphPointLayer({ dispatch, id }) {
    const [xCoordinate, setXCoordinate] = useState(0);
    const [yCoordinate, setYCoordinate] = useState(0);
    const [visible, setVisible] = useState(true);
    const [filled, setFilled] = useState(true);

    // useEffect(() => {
    //     dispatch({
    //         type: "update_layer",
    //         newLayer: {
    //             id: id,
    //             type: "point",
    //             visible: visible,
    //             xValue: xCoordinate,
    //             yValue: yCoordinate,
    //             filled: filled,
    //         },
    //     });
    // }, [xCoordinate, yCoordinate]);

    function handleXCoordinateChange(e) {
        setXCoordinate(Number(e.target.value));
    }

    function handleYCoordinateChange(e) {
        setYCoordinate(Number(e.target.value));
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
