import { useState } from "react";
import Dropdown from "../Dropdown";
import { useEffect } from "react";
import DeleteLayerButton from "../DeleteLayerButton";
import "../../styles/graph-point-layers-styles.css";

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
                    <div className="main-graph-point-container">
                        <div className="main-graph-point-container-grid">
                            <div className="graph-point-coordinates-container">
                                <label>Coordinates:</label>
                                <div className="coordinate-input-container">
                                    <div>
                                        <label>x: </label>
                                        <input
                                            className="number-input-field"
                                            type="number"
                                            value={xCoordinate}
                                            onChange={handleXCoordinateChange}
                                            step={0.1}
                                        ></input>
                                    </div>
                                    <div>
                                        <label>y: </label>
                                        <input
                                            className="number-input-field"
                                            type="number"
                                            value={yCoordinate}
                                            onChange={handleYCoordinateChange}
                                            step={0.1}
                                        ></input>
                                    </div>
                                </div>
                            </div>
                            <div className="graph-point-styles-container">
                                <div className="size-container">
                                    <label>size:</label>
                                    <input
                                        className="number-input-field"
                                        type="number"
                                        step={1}
                                        min={1}
                                        value={size}
                                        onChange={handleSizeChange}
                                    ></input>
                                </div>

                                <div className="color-input-field">
                                    <label>color: </label>
                                    <input type="color" value="#ff000"></input>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Dropdown label="Fill">
                        <div>
                            <label>fill: </label>
                            <input
                                type="checkbox"
                                checked={filled}
                                onChange={handleFilledChange}
                            ></input>
                        </div>

                        <div className="color-input-field">
                            <label>fill color: </label>
                            <input type="color" value="#ff000"></input>
                        </div>
                    </Dropdown>

                    <div className="delete-button-container">
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
                    </div>
                </Dropdown>
            </div>
        </div>
    );
}

export default GraphPointLayer;
