import { useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import "../../styles/rectangle-layer-styles.css";
import NumberInputField from "../InputWidgets/NumberInputField";
import CheckboxInputField from "../InputWidgets/CheckboxInputField";
import InfoLabel from "../InfoLabel";

function RectangleLayer({ id, dispatch }) {
    const [height, setHeight] = useState(0.5);
    const [width, setWidth] = useState(0.5);
    const [posCenter, setPosCenter] = useState(false);
    const [posCenterValue, setPosCenterValue] = useState("0, 0");
    const [bottomValue, setBottomValue] = useState("");

    function handleHeightChange(e) {
        setHeight(e.target.value);
    }

    function handeWidthChange(e) {
        setWidth(e.target.value);
    }

    function handlePosChange() {
        setPosCenter(!posCenter);
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
            },
        });
    }, [height, width, posCenter]);

    return (
        <Dropdown label={"Rectangle"}>
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

            <Dropdown label={"Positioning"}>
                <div
                    onClick={() => {
                        if (!posCenter) {
                            handlePosChange();
                        }
                    }}
                >
                    <input
                        type="checkbox"
                        checked={posCenter}
                        onChange={handlePosChange}
                    ></input>
                    <label>center:</label>
                    <input type="text"></input>
                    <InfoLabel
                        infoText={"Enter as an ordered pair, e.g (0, 0)"}
                    ></InfoLabel>
                </div>
                <div
                    onClick={() => {
                        if (posCenter) {
                            handlePosChange();
                        }
                    }}
                >
                    <input
                        type="checkbox"
                        checked={!posCenter}
                        onChange={handlePosChange}
                    ></input>
                    <label>bottom-left:</label>
                    <input type="text"></input>
                    <InfoLabel
                        infoText={"Enter as an ordered pair, e.g (0, 0)"}
                    ></InfoLabel>
                </div>
            </Dropdown>
            <Dropdown label={"Fill"}>
                <label>Opacity</label>
            </Dropdown>
            <Dropdown label={"Advanced"}>
                <CheckboxInputField label={"outline"}></CheckboxInputField>

                <NumberInputField
                    label={"rounded-corners"}
                    min={0}
                    max={10}
                    step={0.1}
                ></NumberInputField>
            </Dropdown>
        </Dropdown>
    );
}

export default RectangleLayer;
