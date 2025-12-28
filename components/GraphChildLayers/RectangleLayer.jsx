import { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import "../../styles/GraphLayerComponentStyles/rectangle-layer-styles.css";
import NumberInputField from "../InputWidgets/NumberInputField";
import CheckboxInputField from "../InputWidgets/CheckboxInputField";
import TextInputField from "../InputWidgets/TextInputField";
import DeleteLayerButton from "../DeleteLayerButton";
import SliderInputField from "../InputWidgets/SliderInputField";
import ColorInputField from "../InputWidgets/ColorInputField";
import DropdownInputField from "../InputWidgets/DropdownInputField";

function RectangleLayer({ id, dispatch, layer }) {
    //Object data
    //Basic settings
    const [height, setHeight] = useState(layer.height ?? 0.5);
    const [width, setWidth] = useState(layer.width ?? 0.5);

    //Position settings
    const [posCenter, setPosCenter] = useState(layer.posCenter ?? false);
    const [centerValue, setCenterValue] = useState(
        layer.centerValue ?? "(0, 0)"
    );
    const [bottomValue, setBottomValue] = useState(
        layer.bottomValue ?? "(0, 0)"
    );

    //Fill settings
    const [fill, setFill] = useState(layer.fill ?? false);
    const [opacity, setOpacity] = useState(layer.opacity ?? 100);
    const [fillColor, setFillColor] = useState(layer.fillColor ?? "000000");

    //Dropdown options
    const [isOpen, setIsOpen] = useState(layer.isOpen ?? false);
    const [isPosOpen, setIsPosOpen] = useState(layer.isPosOpen ?? false);
    const [isFillOpen, setIsFillOpen] = useState(layer.isFillOpen ?? false);

    const objectData = [
        height,
        width,
        posCenter,
        centerValue,
        bottomValue,
        fill,
        opacity,
        fillColor,
    ];

    const dropdownData = [isOpen, isPosOpen, isFillOpen];

    const strokeOptions = [
        { value: "solid", label: "solid" },
        { value: "dotted", label: "dotted" },
        { value: "dashed", label: "dashed" },
    ];

    //Handlers
    function handleHeightChange(e) {
        setHeight(e.target.value);
    }

    function handeWidthChange(e) {
        setWidth(e.target.value);
    }

    function handleCenterValueChange(e) {
        setCenterValue(e.target.value);
    }

    function handleBottomChange(e) {
        setBottomValue(e.target.value);
    }

    function handlePosChange() {
        setPosCenter(!posCenter);
    }

    function handleFillChange() {
        setFill(!fill);
    }

    function handleOpacityChange(e) {
        setOpacity(e.target.value);
    }

    function handleFillColorChange(e) {
        setFillColor(e.target.value);
    }

    useEffect(() => {
        dispatch({
            type: "edit_layer",
            newLayer: {
                type: "Rectangle",
                id: id,

                height: height,
                width: width,
                posCenter: posCenter,
                centerValue: centerValue,
                bottomValue: bottomValue,
                fill: fill,
                fillColor: fillColor,
                opacity: opacity,

                isOpen: isOpen,
                isPosOpen: isPosOpen,
                isFillOpen: isFillOpen,
            },
        });
    }, [objectData, dropdownData]);

    return (
        <Dropdown label={"Rectangle"} isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="main-rectangle-options-container">
                <div className="main-rectangle-column-1">
                    <NumberInputField
                        label={"height:"}
                        min={0.1}
                        max={10}
                        step={0.1}
                        value={height}
                        onChangeFunction={handleHeightChange}
                    ></NumberInputField>

                    <NumberInputField
                        label={"width: "}
                        min={0.1}
                        max={10}
                        step={0.1}
                        value={width}
                        onChangeFunction={handeWidthChange}
                    ></NumberInputField>
                </div>

                <div className="main-rectangle-column-2">
                    <DropdownInputField
                        label={"stroke: "}
                        values={strokeOptions}
                    ></DropdownInputField>

                    <ColorInputField label={"color: "}></ColorInputField>
                </div>
            </div>

            <Dropdown
                label={"Positioning"}
                isOpen={isPosOpen}
                setIsOpen={setIsPosOpen}
            >
                <div
                    className="center-field-container"
                    onClick={() => {
                        if (!posCenter) {
                            handlePosChange();
                        }
                    }}
                >
                    <CheckboxInputField
                        label={"center: "}
                        value={posCenter}
                        onChangeFunction={handlePosChange}
                    ></CheckboxInputField>
                    <TextInputField
                        value={centerValue}
                        onChangeFunction={handleCenterValueChange}
                    ></TextInputField>
                </div>

                <div
                    className="bottom-field-container"
                    onClick={() => {
                        if (posCenter) {
                            handlePosChange();
                        }
                    }}
                >
                    <CheckboxInputField
                        label={"bottom left: "}
                        value={!posCenter}
                        onChangeFunction={handlePosChange}
                    ></CheckboxInputField>
                    <TextInputField
                        value={bottomValue}
                        onChangeFunction={handleBottomChange}
                    ></TextInputField>
                </div>
            </Dropdown>

            <Dropdown
                label={"Fill"}
                isOpen={isFillOpen}
                setIsOpen={setIsFillOpen}
            >
                <div className="fill-rectangle-container">
                    <div className="fill-rectangle-column-1">
                        <CheckboxInputField
                            onChangeFunction={handleFillChange}
                            value={fill}
                            label={"fill"}
                        ></CheckboxInputField>

                        <ColorInputField
                            label={"color:"}
                            value={fillColor}
                            onChangeFunction={handleFillColorChange}
                        ></ColorInputField>
                    </div>
                    <div className="fill-rectangle-column-1">
                        <SliderInputField
                            label={"opacity:"}
                            min={0}
                            max={100}
                            value={opacity}
                            onChangeFunction={handleOpacityChange}
                        ></SliderInputField>
                    </div>
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
    );
}

export default RectangleLayer;
