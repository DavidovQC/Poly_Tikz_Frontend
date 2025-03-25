import Dropdown from "../Dropdown";
import { useState, useEffect } from "react";

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

    //Working
    const [ticksOnY, setTicksOnY] = useState(false);
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
                ticksStep: ticksStep,
                xAxisVisible: xAxisVisible,
                yAxisVisible: yAxisVisible,
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
        ticksStep,
        xAxisVisible,
        yAxisVisible,
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
        setGraphType(event.target.value);
    }

    function handleArrowsChange(event) {
        setArrowsOn(!arrowsOn);
    }

    function handleGridChange() {
        setGridOn(!gridOn);
    }

    function handleTicksChange() {
        setTicksOnX(!ticksOnX);
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

    return (
        <Dropdown label="Axes">
            <div className="Axis-options graph-options-container">
                <div className="graph-button-container">
                    <button onClick={handleGraphTypeChange} value={"Cross"}>
                        Cross
                    </button>
                    <button onClick={handleGraphTypeChange} value={"L-Shape"}>
                        L-Shape
                    </button>
                    <button onClick={handleGraphTypeChange} value={"T-Bar"}>
                        T-Bar
                    </button>
                </div>
                <div className="axis-size-container">
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
                </div>

                <div className="checkbox-field">
                    <label>arrows</label>
                    <input
                        type="checkbox"
                        checked={arrowsOn}
                        onChange={handleArrowsChange}
                    ></input>
                </div>

                <Dropdown label="Ticks">
                    <div className="checkbox-field">
                        <label>x-axis</label>
                        <input
                            type="checkbox"
                            checked={ticksOnX}
                            onChange={handleTicksChange}
                        ></input>
                    </div>

                    {/* <div className="checkbox-field">
                        <label>y-axis</label>
                        <input
                            type="checkbox"
                            checked={ticksOn}
                            onChange={handleTicksChange}
                        ></input>
                    </div> */}

                    {/* <div className="checkbox-field">
                        <label>radians</label>
                        <input type="checkbox"></input>
                    </div> */}
                    <div>
                        <label>Step:</label>
                        <input
                            type="number"
                            step={0.1}
                            max="10"
                            value={ticksStep}
                            onChange={handleTickStepChange}
                        ></input>
                    </div>
                    {/* <div>
                        <label>Spacing:</label>
                        <input
                            type="number"
                            step={0.1}
                            max="10"
                            defaultValue={1}
                        ></input>
                    </div> */}
                </Dropdown>

                <Dropdown label="Grid">
                    <div className="Grid-options graph-options-container">
                        <div className="checkbox-field">
                            <label>grid</label>
                            <input
                                type="checkbox"
                                checked={gridOn}
                                onClick={handleGridChange}
                            ></input>
                        </div>

                        <div>
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
                    </div>
                </Dropdown>
                <Dropdown label="Advanced">
                    <div className="checkbox-field">
                        <label>x-axis visible:</label>
                        <input
                            type="checkbox"
                            checked={xAxisVisible}
                            onChange={handleXAxisVisibleChange}
                        ></input>
                    </div>

                    <div className="checkbox-field">
                        <label>y-axis visible:</label>
                        <input
                            type="checkbox"
                            checked={yAxisVisible}
                            onChange={handleYAxisVisibleChange}
                        ></input>
                    </div>
                </Dropdown>
            </div>
        </Dropdown>
    );
}

export default AxisLayer;
