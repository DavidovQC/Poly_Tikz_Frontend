import { useState } from "react";
import Dropdown from "../Dropdown";
import { useEffect } from "react";
import TextInputField from "../InputWidgets/TextInputField";

import "../../styles/GraphLayerComponentStyles/graph-point-layers-styles.css";

import DropdownInputField from "../InputWidgets/DropdownInputField";
import NumberInputField from "../InputWidgets/NumberInputField";
import ColorInputField from "../InputWidgets/ColorInputField";
import CheckboxInputField from "../InputWidgets/CheckboxInputField";
import LargeTextInputField from "../InputWidgets/LargeTextInputField";

function GraphLabelLayer({ dispatch, id, layer, isVisible }) {
    //Main
    // const [pointsList, setPointsList] = useState("");
    const [xCoordinate, setXCoordinate] = useState(layer.xCoordinate ?? 0);
    const [yCoordinate, setYCoordinate] = useState(layer.yCoordinate ?? 0);
    const [size, setSize] = useState(layer.size ?? 1);
    const [radialColor, setRadialColor] = useState("#000000");

    //Fill:
    const [fillOn, setFillOn] = useState(layer.fillOn ?? true);
    const [fillColor, setFillColor] = useState(layer.fillColor ?? "#000000");

    //Label:
    const [pointLabel, setPointLabel] = useState(layer.PointLabel ?? "");
    const [labelOrientation, setLabelOrientation] = useState(
        layer.labelOrientation ?? "right"
    );

    //Dropdown:
    const [isOpen, setIsOpen] = useState(layer.isOpen ?? false);
    const [isFillOpen, setIsFillOpen] = useState(layer.isFillOpen ?? false);
    const [isLabelOpen, setIsLabelOpen] = useState(layer.isLabelOpen ?? false);

    ///to be implemented:

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

    const dropdownData = [isOpen, isFillOpen, isLabelOpen];

    useEffect(() => {
        dispatch({
            type: "edit_layer",
            newLayer: {
                id: id,
                type: "Point",
                isVisible: isVisible,

                xValue: xCoordinate,
                yValue: yCoordinate,
                size: size,
                fillOn: fillOn,
                fillColor: fillColor,
                radialColor: radialColor,
                pointLabel: pointLabel,
                labelOrientation: labelOrientation,

                isOpen: isOpen,
                isFillOpen: isFillOpen,
                isLabelOpen: isLabelOpen,
            },
        });
    }, [objectData, dropdownData]);

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
                <Dropdown label="Point" isOpen={isOpen} setIsOpen={setIsOpen}>
                    <div className="main-graph-point-container">
                        <div className="main-graph-point-column-1">
                            <LargeTextInputField
                                label={"Coordinates: "}
                                infoText={
                                    "Input as a comma separated list of coordinates, (e.g, (0, 0), (1, 1))"
                                }
                            ></LargeTextInputField>
                        </div>

                        <div className="main-graph-point-column-2">
                            <NumberInputField
                                label={"size: "}
                                step={1}
                                min={1}
                                value={size}
                                onChangeFunction={handleSizeChange}
                            ></NumberInputField>

                            <ColorInputField
                                label={"color: "}
                                value={radialColor}
                                onChangeFunction={handleRadialColorChange}
                            ></ColorInputField>
                        </div>
                    </div>

                    <Dropdown
                        label="Fill"
                        isOpen={isFillOpen}
                        setIsOpen={setIsFillOpen}
                    >
                        <div className="fill-graph-point-container">
                            <div className="fill-graph-point-column-1">
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
                            </div>
                        </div>
                    </Dropdown>

                    <Dropdown
                        label="Label"
                        isOpen={isLabelOpen}
                        setIsOpen={setIsLabelOpen}
                    >
                        <div className="label-graph-point-container">
                            <div className="label-graph-point-column-1">
                                <TextInputField
                                    label={"label:"}
                                    onChangeFunction={handlePointLabelChange}
                                    value={pointLabel}
                                ></TextInputField>

                                <DropdownInputField
                                    label={"orientation:"}
                                    values={orientationValues}
                                    onSelectFunction={
                                        handleLabelOrientationChange
                                    }
                                ></DropdownInputField>
                            </div>
                        </div>
                    </Dropdown>
                </Dropdown>
            </div>
        </div>
    );
}

export default GraphLabelLayer;
