import { useState } from "react";
import Dropdown from "../Dropdown";
import { useEffect } from "react";
import DeleteLayerButton from "../DeleteLayerButton";

function GraphPointLayer({ dispatch, id }) {
    const [xCoordinate, setXCoordinate] = useState(0);
    const [yCoordinate, setYCoordinate] = useState(0);
    const [filled, setFilled] = useState(false);
    const [size, setSize] = useState(1);
    const [nodeText, setNodeText] = useState("");

    ///to be implemented:
    const [visible, setVisible] = useState(true);

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
                nodeText: nodeText,
            },
        });
    }, [xCoordinate, yCoordinate, size, filled, nodeText]);

    function handleXCoordinateChange(e) {
        setXCoordinate(e.target.value);
    }

    function handleYCoordinateChange(e) {
        setYCoordinate(e.target.value);
    }

    function handleSizeChange(e) {
        setSize(e.target.value);
    }

    function handleFilledChange(e) {
        setFilled(!filled);
    }

    function handleNodeTextChange(e) {
        setNodeText(e.target.value);
    }

    return (
        <div>
            <div>
                <Dropdown label="Point">
                    <div className="point-coordinates-container">
                        <label>Coordinates:</label>
                        <div>
                            <label>x: </label>
                            <input
                                type="number"
                                value={xCoordinate}
                                onChange={handleXCoordinateChange}
                                step={0.1}
                            ></input>
                        </div>
                        <label>y: </label>
                        <input
                            type="number"
                            value={yCoordinate}
                            onChange={handleYCoordinateChange}
                            step={0.1}
                        ></input>
                    </div>

                    <div>
                        <label>Filled:</label>
                        <input
                            type="checkbox"
                            checked={filled}
                            onChange={handleFilledChange}
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

                    {/* <Dropdown label="Node">
                        <label>Node text:</label>
                        <input
                            type="text"
                            value={nodeText}
                            onChange={handleNodeTextChange}
                        ></input>
                    </Dropdown> */}

                    <DeleteLayerButton
                        clickFunction={() =>
                            dispatch({
                                type: "delete_layer",
                                payload: {
                                    id: id,
                                },
                            })
                        }
                    ></DeleteLayerButton>
                </Dropdown>
            </div>
        </div>
    );
}

export default GraphPointLayer;
