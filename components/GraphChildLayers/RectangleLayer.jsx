import { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import "../../styles/GraphLayerComponentStyles/rectangle-layer-styles.css";
import NumberInputField from "../InputWidgets/NumberInputField";
import CheckboxInputField from "../InputWidgets/CheckboxInputField";
import TextInputField from "../InputWidgets/TextInputField";
import DeleteLayerButton from "../DeleteLayerButton";
import SliderInputField from "../InputWidgets/SliderInputField";
import ColorInputField from "../InputWidgets/ColorInputField";

function RectangleLayer({ id, dispatch, layer }) {
    //basic settings
    const [height, setHeight] = useState(layer.height ?? 0.5);
    const [width, setWidth] = useState(layer.width ?? 0.5);

    //position settings
    const [posCenter, setPosCenter] = useState(layer.posCenter ?? false);
    const [centerValue, setCenterValue] = useState(
        layer.centerValue ?? "(0, 0)"
    );
    const [bottomValue, setBottomValue] = useState(
        layer.bottomValue ?? "(0, 0)"
    );

    //fill settings
    const [fill, setFill] = useState(layer.fill ?? false);
    const [opacity, setOpacity] = useState(layer.opacity ?? 100);
    const [fillColor, setFillColor] = useState(layer.fillColor ?? "000000");

    //dropdown options
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
            <div className="dimension-container">
                <NumberInputField
                    label={"Height:"}
                    min={0.1}
                    max={10}
                    step={0.1}
                    value={height}
                    onChangeFunction={handleHeightChange}
                ></NumberInputField>

                <NumberInputField
                    label={"Width:"}
                    min={0.1}
                    max={10}
                    step={0.1}
                    value={width}
                    onChangeFunction={handeWidthChange}
                ></NumberInputField>
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
                <div className="fill-container">
                    <div className="fill-container-col-1">
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
                    <div className="fill-container-col-2">
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

            {/* <Dropdown label={"Advanced"}>
                <CheckboxInputField label={"outline"}></CheckboxInputField>

                <NumberInputField
                    label={"rounded-corners"}
                    min={0}
                    max={10}
                    step={0.1}
                ></NumberInputField>
            </Dropdown> */}

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
