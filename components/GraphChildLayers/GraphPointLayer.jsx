import { useState } from "react";
import Dropdown from "../Dropdown";
import { useEffect } from "react";

function GraphPointLayer({ dispatch, id }) {
    const [xCoordinate, setXCoordinate] = useState(0);
    const [yCoordinate, setYCoordinate] = useState(0);

    const [size, setSize] = useState(1);

    ///to be implemented:
    const [visible, setVisible] = useState(true);
    const [filled, setFilled] = useState(true);

    useEffect(() => {
        console.log("Point sending dispatch");
        dispatch({
            type: "edit_layer",
            newLayer: {
                id: id,
                type: "Point",
                visible: visible,
                xValue: xCoordinate,
                yValue: yCoordinate,

                filled: filled,
                size: size,
            },
        });
    }, [xCoordinate, yCoordinate, size]);

    function handleXCoordinateChange(e) {
        setXCoordinate(e.target.value);
    }

    function handleYCoordinateChange(e) {
        setYCoordinate(e.target.value);
    }

    function handleSizeChange(e) {
        setSize(e.target.value);
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
                            step={0.1}
                        ></input>
                        <label>y</label>
                        <input
                            type="number"
                            value={yCoordinate}
                            onChange={handleYCoordinateChange}
                            step={0.1}
                        ></input>
                    </div>
                    <div>
                        <label>Size:</label>
                        <input
                            type="number"
                            step={1}
                            min={1}
                            value={size}
                            onChange={handleSizeChange}
                        ></input>
                    </div>

                    <Dropdown label="Node">
                        <label>Node text:</label>
                        <input type="text"></input>
                    </Dropdown>
                </Dropdown>
            </div>
        </div>
    );
}

export default GraphPointLayer;
