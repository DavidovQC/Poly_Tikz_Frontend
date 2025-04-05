import { useState, useEffect } from "react";
import Dropdown from "../Dropdown";
import DeleteLayerButton from "../DeleteLayerButton";
import "../../styles/circle-layers-styles.css";

function CircleLayer({ id, dispatch }) {
    const [xOrigin, setXOrigin] = useState(0);
    const [yOrigin, setYOrigin] = useState(0);
    const [radius, setRadius] = useState(1);
    const [color, setColor] = useState("#00ff00");

    function handleXOriginChange(e) {
        setXOrigin(e.target.value);
    }

    function handleYOriginChange(e) {
        setYOrigin(e.target.value);
    }

    function handleRadiusChange(e) {
        setRadius(e.target.value);
    }

    function handeColorChange(e) {
        setColor(e.target.value);
    }

    useEffect(() => {
        dispatch({
            type: "edit_layer",
            newLayer: {
                type: "Circle",
                id: id,
                radius: radius,
                xOrigin: xOrigin,
                yOrigin: yOrigin,
                color: color,
            },
        });
        console.log({
            type: "Circle",
            id: id,
            radius: radius,
            xOrigin: xOrigin,
            yOrigin: yOrigin,
        });
    }, [xOrigin, yOrigin, radius, color]);

    return (
        <Dropdown label="Circle">
            <div className="main-circle-container">
                <div className="main-circle-container-grid">
                    <div className="center-coordinates-container">
                        <div>
                            <label>origin x:</label>
                            <input
                                className="number-input-field"
                                type="number"
                                step={0.1}
                                value={xOrigin}
                                onChange={handleXOriginChange}
                            ></input>
                        </div>

                        <div>
                            <label>origin y:</label>
                            <input
                                className="number-input-field"
                                type="number"
                                step={0.1}
                                value={yOrigin}
                                onChange={handleYOriginChange}
                            ></input>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>radius:</label>
                            <input
                                className="number-input-field"
                                type="number"
                                step={0.1}
                                value={radius}
                                onChange={handleRadiusChange}
                            ></input>
                        </div>

                        <div className="color-input-field">
                            <label>color: </label>
                            <input
                                type="color"
                                value={color}
                                onChange={handeColorChange}
                            ></input>
                        </div>
                    </div>
                </div>
            </div>
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
    );
}

export default CircleLayer;
