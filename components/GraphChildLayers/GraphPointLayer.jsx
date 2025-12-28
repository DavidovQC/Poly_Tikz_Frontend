import { useState } from "react";
import Dropdown from "../Dropdown";
import { useEffect } from "react";
import DeleteLayerButton from "../DeleteLayerButton";
import TextInputField from "../InputWidgets/TextInputField";

import "../../styles/graph-point-layers-styles.css";
import DropdownInputField from "../InputWidgets/DropdownInputField";
import NumberInputField from "../InputWidgets/NumberInputField";
import ColorInputField from "../InputWidgets/ColorInputField";
import CheckboxInputField from "../InputWidgets/CheckboxInputField";
import InfoLabel from "../InfoLabel";
import LargeTextInputField from "../InputWidgets/LargeTextInputField";

function GraphPointLayer({ dispatch, id, layer }) {
    const [xCoordinate, setXCoordinate] = useState(0);
    const [yCoordinate, setYCoordinate] = useState(0);

    const [size, setSize] = useState(1);

    const [pointLabel, setPointLabel] = useState("");
    const [labelOrientation, setLabelOrientation] = useState("right");

    ///to be implemented:
    const [radialColor, setRadialColor] = useState("#000000");
    const [fillColor, setFillColor] = useState("#000000");
    const [fillOn, setFillOn] = useState(true);

    const objectData = [
        xCoordinate,
        yCoordinate,
        size,

        pointLabel,
        labelOrientation,
        radialColor,
        fillColor,
        fillOn,
    ];

    useEffect(() => {
        console.log("Point sending dispatch");
        dispatch({
            type: "edit_layer",
            newLayer: {
                id: id,
                type: "Point",

                xValue: xCoordinate,
                yValue: yCoordinate,

                size: size,

                fillOn: fillOn,
                fillColor: fillColor,
                radialColor: radialColor,
                pointLabel: pointLabel,

                labelOrientation: labelOrientation,
            },
        });
    }, objectData);

    function handleXCoordinateChange(e) {
        setXCoordinate(e.target.value);
    }

    function handleYCoordinateChange(e) {
        setYCoordinate(e.target.value);
    }

    function handleSizeChange(e) {
        setSize(e.target.value);
    }

    function handleRadialColorChange(e) {
        setRadialColor(e.target.value);
    }

    function handleFillColorChange(e) {
        setFillColor(e.target.value);
    }

    function handleFillChange() {
        setFillOn(!fillOn);
    }

    function handlePointLabelChange(e) {
        setPointLabel(e.target.value);
    }

    function handleLabelOrientationChange(e) {
        setLabelOrientation(e.target.value);
    }

    const orientationValues = [
        { value: "right", label: "Right" },
        { value: "left", label: "Left" },
        { value: "above", label: "Above" },
        { value: "below", label: "Below" },
        { value: "above right", label: "Above Right" },
        { value: "above left", label: "Above Left" },
        { value: "below right", label: "Below Right" },
        { value: "below left", label: "Below Left" },
    ];

    return (
        <div>
            <div>
                <Dropdown label="Point">
                    <div className="main-graph-point-container">
                        <div className="coordinates-input-container">
                            <LargeTextInputField
                                label={"Coordinates: "}
                                infoText={
                                    "Input as a comma separated list of coordinates, (e.g, (0, 0), (1, 1))"
                                }
                            ></LargeTextInputField>
                        </div>
                    </div>
                    <div className="graph-point-styles-container">
                        <NumberInputField
                            step={1}
                            min={1}
                            value={size}
                            onChangeFunction={handleSizeChange}
                        ></NumberInputField>

                        <ColorInputField
                            label={"color:"}
                            value={radialColor}
                            onChangeFunction={handleRadialColorChange}
                        ></ColorInputField>
                    </div>

                    <Dropdown label="Fill">
                        <CheckboxInputField
                            label={"fill:"}
                            value={fillOn}
                            onChangeFunction={handleFillChange}
                        ></CheckboxInputField>

                        <ColorInputField
                            label={"fill color:"}
                            value={fillColor}
                            onChangeFunction={handleFillColorChange}
                        ></ColorInputField>
                    </Dropdown>

                    <Dropdown label="Label">
                        <TextInputField
                            label={"label:"}
                            onChangeFunction={handlePointLabelChange}
                            value={pointLabel}
                        ></TextInputField>

                        <DropdownInputField
                            label={"orientation:"}
                            values={orientationValues}
                            onSelectFunction={handleLabelOrientationChange}
                        ></DropdownInputField>
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
