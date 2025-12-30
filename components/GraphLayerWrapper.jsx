import { useContext } from "react";
import { LayerContext } from "../Layers/LayersContext";

import "../styles/graph-layer-wrapper-styles.css";

import CopyLayerButton from "./Buttons/CopyLayerButton";
import DltLayerButton from "./Buttons/DeleteLayerButton";
import ToggleVisibleButton from "./Buttons/ToggleVisibleButton";

function GraphLayerWrapper({ index, children, draggable, id }) {
    const { dispatch } = useContext(LayerContext);

    function onDragStart(e) {
        e.dataTransfer.setData("text/plain", index);
    }

    function onDragOver(e) {
        e.preventDefault();
    }

    function onDrop(e) {
        const fromIndex = Number(e.dataTransfer.getData("text/plain"));
        const toIndex = index;

        if (fromIndex != toIndex) {
            dispatch({
                type: "move_layer",
                payload: { fromIndex, toIndex },
            });
        }
    }

    function deleteLayer() {
        dispatch({
            type: "delete_layer",
            payload: {
                id: id,
            },
        });
    }

    function copyLayer() {
        dispatch({
            type: "copy_layer",
            payload: {
                id: id,
            },
        });
    }

    function toggleVisible(e) {
        dispatch({
            type: "toggle_visible",
            payload: {
                id: id,
            },
        });
    }

    return (
        //If not draggable (as in the case with the axes) then no behavior should be defined

        <div className="graph-layer-wrapper">
            <div
                className="drag-bar-container"
                draggable={draggable}
                onDragStart={draggable ? onDragStart : undefined}
                onDragOver={draggable ? onDragOver : undefined}
                onDrop={draggable ? onDrop : undefined}
            >
                <div className="buttons-container">
                    <ToggleVisibleButton
                        onClickFunction={toggleVisible}
                    ></ToggleVisibleButton>
                    <CopyLayerButton></CopyLayerButton>
                    <DltLayerButton
                        onClickFunction={deleteLayer}
                    ></DltLayerButton>
                </div>
            </div>

            {children}
        </div>
    );
}

export default GraphLayerWrapper;
