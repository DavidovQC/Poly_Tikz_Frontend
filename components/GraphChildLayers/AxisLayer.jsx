import Dropdown from "../Dropdown";
import { useState, useEffect } from "react";
import SVGButton from "../SVGButton";
import SVGButtonArray from "../SVGButtonArray";
import svgData from "../../assets/SVGButtonData";
import "../../styles/axis-layers-styles.css";

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
    const [axisColor, setAxisColor] = useState("000000");
    const [gridColor, setGridColor] = useState("#ff0000");

    //Working

    //in progress
    const [ticksStep, setTicksStep] = useState(1);

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
    }, [
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
    ]);

    // const xAxisSizeInput = useRef(1);
    // const yAxisSizeInput = useRef(1);
    // const gridStep = useRef(1);
    // const ticksStep = useRef(1);

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
        <Dropdown label="Axes">
            <div className="Axis-options graph-options-container">
                <SVGButtonArray>
                    {svgData.map((graph) => {
                        return (
                            <SVGButton
                                onClickFunction={handleGraphTypeChange}
                                value={graph.dataValue}
                                svgTag={graph.svg}
                            ></SVGButton>
                        );
                    })}
                </SVGButtonArray>
                <div className="main-axis-options-container">
                    <div className="main-axis-options-container-grid">
                        <div className="x-axis-container">
                            <label>x-axis size:</label>
                            <input
                                className="number-input-field"
                                value={xAxisSize}
                                type="number"
                                min={0.1}
                                max={10}
                                step={0.1}
                                onChange={handleXAxisSizeChange}
                            ></input>
                        </div>

                        <div className="checkbox-field">
                            <input
                                type="checkbox"
                                checked={arrowsOn}
                                onChange={handleArrowsChange}
                            ></input>
                            <label>arrows</label>
                        </div>

                        <div className="y-axis-container">
                            <label>y-axis size:</label>
                            <input
                                className="number-input-field"
                                value={yAxisSize}
                                type="number"
                                min={0.1}
                                max={10}
                                step={0.1}
                                onChange={handleYAxisSizeChange}
                            ></input>
                        </div>

                        <div className="color-input-field">
                            <label>color: </label>
                            <input
                                type="color"
                                id="colorPicker"
                                value={axisColor}
                                onChange={handleAxisColorChange}
                            ></input>
                        </div>
                    </div>
                </div>

                <Dropdown label="Ticks">
                    <div className="ticks-options-container">
                        <div className="ticks-options-container-grid">
                            <div className="ticks-visible-container">
                                <div className="checkbox-field">
                                    <input
                                        type="checkbox"
                                        checked={ticksOnX}
                                        onChange={handleTicksXChange}
                                    ></input>
                                    <label>x-axis</label>
                                </div>

                                <div>
                                    <div className="checkbox-field">
                                        <input
                                            type="checkbox"
                                            checked={ticksOnY}
                                            onChange={handleTicksYChange}
                                        ></input>
                                        <label>y-axis</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <div className="ticks-step-container">
                            <label>step</label>
                            <input
                                className="number-input-field"
                                type="number"
                                value={ticksStep}
                                onChange={handleTickStepChange}
                                min={0.1}
                                max={10}
                                step={0.1}
                            ></input>
                        </div> */}
                    </div>
                </Dropdown>

                <Dropdown label="Grid">
                    <div className="grid-options-container">
                        <div className="grid-options-container-grid">
                            <div className="grid-visible-container">
                                <div className="checkbox-field">
                                    <input
                                        type="checkbox"
                                        checked={gridOn}
                                        onClick={handleGridChange}
                                    ></input>
                                    <label>grid</label>
                                </div>
                            </div>
                            <div className="grid-step-container">
                                <label>step: </label>
                                <input
                                    type="number"
                                    value={gridStep}
                                    min=".1"
                                    max="3"
                                    step=".1"
                                    onChange={handleGridStepChange}
                                ></input>
                            </div>

                            <div className="color-input-field">
                                <label>color:</label>
                                <input
                                    type="color"
                                    value={gridColor}
                                    onChange={handleGridColorChange}
                                ></input>
                            </div>
                        </div>
                    </div>
                </Dropdown>
                <Dropdown label="Advanced">
                    <div className="advanced-options-container">
                        <div className="advanced-options-container-grid">
                            <div>
                                <div className="checkbox-field">
                                    <input
                                        type="checkbox"
                                        checked={xAxisVisible}
                                        onChange={handleXAxisVisibleChange}
                                    ></input>
                                    <label>x-axis visible</label>
                                </div>

                                <div className="checkbox-field">
                                    <input
                                        type="checkbox"
                                        checked={yAxisVisible}
                                        onChange={handleYAxisVisibleChange}
                                    ></input>
                                    <label>y-axis visible</label>
                                </div>
                            </div>

                            {/* <div className="scale container">
                                <label>scale:</label>
                                <input
                                    className="number-input-field"
                                    value={xAxisSize}
                                    type="number"
                                    min={0.1}
                                    max={10}
                                    step={0.1}
                                    onChange={handleXAxisSizeChange}
                                ></input>
                            </div> */}
                        </div>
                    </div>
                </Dropdown>
            </div>
        </Dropdown>
    );
}

export default AxisLayer;
