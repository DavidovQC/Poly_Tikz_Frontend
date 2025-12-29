import Dropdown from "../Dropdown";
import { useState, useEffect } from "react";
import SVGButton from "../SVGButton";
import SVGButtonArray from "../SVGButtonArray";
import svgData from "../../assets/SVGButtonData";
import "../../styles/GraphLayerComponentStyles/axis-layers-styles.css";
import NumberInputField from "../InputWidgets/NumberInputField";
import CheckboxInputField from "../InputWidgets/CheckboxInputField";
import ColorInputField from "../InputWidgets/ColorInputField";

function AxisLayer({ dispatch, id }) {
    //Working + Added to Layer
    const [xAxisSize, setXAxisSize] = useState(1);
    const [yAxisSize, setYAxisSize] = useState(1);
    const [graphType, setGraphType] = useState("Cross");
    const [arrowsOn, setArrowsOn] = useState(true);
    const [gridStep, setGridStep] = useState(1);
    const [xAxisVisible, setXAxisVisible] = useState(true);
    const [yAxisVisible, setYAxisVisible] = useState(true);
    const [gridOn, setGridOn] = useState(false);
    const [ticksOnX, setTicksOnX] = useState(false);
    const [ticksOnY, setTicksOnY] = useState(false);
    const [axisColor, setAxisColor] = useState("#000000");
    const [gridColor, setGridColor] = useState("#ff0000");

    //Working
    const [chosenGraphIndex, setChosenGraphIndex] = useState(0);

    //in progress
    const [ticksStep, setTicksStep] = useState(1);

    const objectData = [
        xAxisSize,
        yAxisSize,
        graphType,
        arrowsOn,
        gridStep,
        gridOn,
        ticksOnX,
        ticksOnY,
        ticksStep,
        xAxisVisible,
        yAxisVisible,
        axisColor,
        gridColor,
        ticksStep,
    ];

    useEffect(() => {
        dispatch({
            type: "edit_layer",
            newLayer: {
                type: "Axis",
                id: id,
                xAxisSize: xAxisSize,
                yAxisSize: yAxisSize,
                AxisType: graphType,
                arrowsOn: arrowsOn,
                xAxisVisible: xAxisVisible,
                yAxisVisible: yAxisVisible,
                gridOn: gridOn,
                gridStep: gridStep,
                ticksOnX: ticksOnX,
                ticksOnY: ticksOnY,
                ticksStep: ticksStep,
                axisColor: axisColor,
                gridColor: gridColor,
            },
        });
    }, objectData);

    function handleXAxisSizeChange(event) {
        setXAxisSize(event.target.value);
    }

    function handleYAxisSizeChange(event) {
        setYAxisSize(event.target.value);
    }

    function handleGraphTypeChange(event) {
        setGraphType(event.currentTarget.value);
    }

    function handleArrowsChange(event) {
        setArrowsOn(!arrowsOn);
    }

    function handleGridChange() {
        setGridOn(!gridOn);
    }

    function handleTicksXChange() {
        setTicksOnX(!ticksOnX);
    }

    function handleTicksYChange() {
        setTicksOnY(!ticksOnY);
    }

    function handleXAxisVisibleChange() {
        setXAxisVisible(!xAxisVisible);
    }

    function handleYAxisVisibleChange() {
        setYAxisVisible(!yAxisVisible);
    }

    function handleGridStepChange(event) {
        setGridStep(event.target.value);
    }

    function handleTickStepChange(event) {
        setTicksStep(event.target.value);
    }

    function handleAxisColorChange(event) {
        setAxisColor(event.target.value);
    }

    function handleGridColorChange(event) {
        setGridColor(event.target.value);
    }

    return (
        <Dropdown label="Axes" isOpen={true}>
            <div className="Axis-options graph-options-container">
                <SVGButtonArray>
                    {svgData.map((graph) => {
                        return (
                            <SVGButton
                                key={graph.dataValue}
                                onClickFunction={handleGraphTypeChange}
                                value={graph.dataValue}
                                svgTag={graph.svg}
                                focus={
                                    graph.dataValue == graphType ? true : false
                                }
                            ></SVGButton>
                        );
                    })}
                </SVGButtonArray>
                <div className="main-axis-options-container">
                    <div className="main-column-1">
                        <NumberInputField
                            label={"x-axis size:"}
                            min={0.1}
                            max={10}
                            step={0.1}
                            value={xAxisSize}
                            onChangeFunction={handleXAxisSizeChange}
                        ></NumberInputField>

                        <NumberInputField
                            label={"y-axis size:"}
                            min={0.1}
                            max={10}
                            step={0.1}
                            value={yAxisSize}
                            onChangeFunction={handleYAxisSizeChange}
                        ></NumberInputField>
                    </div>
                    <div className="main-column-2">
                        <CheckboxInputField
                            label={"arrows"}
                            onChangeFunction={handleArrowsChange}
                            value={arrowsOn}
                        ></CheckboxInputField>

                        <ColorInputField
                            label={"color:"}
                            value={axisColor}
                            onChangeFunction={handleAxisColorChange}
                        ></ColorInputField>
                    </div>
                </div>

                <Dropdown label="Ticks">
                    <div className="ticks-options-container">
                        <div className="tick-column-1">
                            <CheckboxInputField
                                label={"x-axis"}
                                onChangeFunction={handleTicksXChange}
                                value={ticksOnX}
                            ></CheckboxInputField>

                            <div>
                                <CheckboxInputField
                                    label={"y-axis"}
                                    onChangeFunction={handleTicksYChange}
                                    value={ticksOnY}
                                ></CheckboxInputField>
                            </div>
                        </div>
                    </div>
                </Dropdown>

                <Dropdown label="Grid">
                    <div className="grid-options-container">
                        <div className="grid-column-1">
                            <CheckboxInputField
                                label={"grid"}
                                onChangeFunction={handleGridChange}
                                value={gridOn}
                            ></CheckboxInputField>

                            <ColorInputField
                                label={"color:"}
                                value={gridColor}
                                onChangeFunction={handleGridColorChange}
                            ></ColorInputField>
                        </div>
                        <div className="grid-column-2">
                            <NumberInputField
                                label={"step:"}
                                value={gridStep}
                                min={0.1}
                                max={3}
                                step={0.1}
                                onChangeFunction={handleGridStepChange}
                            ></NumberInputField>
                        </div>
                    </div>
                </Dropdown>
                <Dropdown label="Advanced">
                    <div className="advanced-options-container">
                        <div className="advanced-column-1">
                            <CheckboxInputField
                                label={"x-axis visible"}
                                value={xAxisVisible}
                                onChangeFunction={handleXAxisVisibleChange}
                            ></CheckboxInputField>

                            <CheckboxInputField
                                label={"y-axis visible"}
                                value={yAxisVisible}
                                onChangeFunction={handleYAxisVisibleChange}
                            ></CheckboxInputField>
                        </div>
                    </div>
                </Dropdown>
            </div>
        </Dropdown>
    );
}

export default AxisLayer;
