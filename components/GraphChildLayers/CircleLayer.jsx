import { useState, useEffect } from "react";
import Dropdown from "../Dropdown";
import DeleteLayerButton from "../DeleteLayerButton";
import "../../styles/GraphLayerComponentStyles/circle-layers-styles.css";
import NumberInputField from "../InputWidgets/NumberInputField";
import ColorInputField from "../InputWidgets/ColorInputField";

function CircleLayer({ id, dispatch, layer }) {
    //Object Data
    //Basic settings
    const [xOrigin, setXOrigin] = useState(layer.xOrigin ?? 0);
    const [yOrigin, setYOrigin] = useState(layer.yOrigin ?? 0);
    const [radius, setRadius] = useState(layer.radius ?? 1);
    const [color, setColor] = useState(layer.color ?? "#00ff00");

    //Dropdown Data
    const [isOpen, setIsOpen] = useState(layer.isOpen ?? false);

    //Handlers
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

    const objectData = [xOrigin, yOrigin, radius, color];
    const dropdownData = [isOpen];

    useEffect(() => {
        dispatch({
            type: "edit_layer",
            newLayer: {
                type: "Circle",
                id: id,

                //Object data:
                radius: radius,
                xOrigin: xOrigin,
                yOrigin: yOrigin,
                color: color,

                //Dropdown data:
                isOpen: isOpen,
            },
        });
    }, [objectData, dropdownData]);

    return (
        <Dropdown label="Circle" isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="main-circle-container">
                <div className="main-circle-column-1">
                    <NumberInputField
                        label={"origin x:"}
                        step={0.1}
                        value={xOrigin}
                        onChangeFunction={handleXOriginChange}
                    ></NumberInputField>

                    <NumberInputField
                        label={"origin y:"}
                        step={0.1}
                        value={yOrigin}
                        onChangeFunction={handleYOriginChange}
                    ></NumberInputField>
                </div>
                <div className="main-circle-column-2">
                    <NumberInputField
                        label={"radius:"}
                        step={0.1}
                        value={radius}
                        onChangeFunction={handleRadiusChange}
                    ></NumberInputField>

                    <ColorInputField
                        label={"color"}
                        value={color}
                        onChangeFunction={handeColorChange}
                    ></ColorInputField>
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
