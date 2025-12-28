import { useContext } from "react";
import { LayerContext } from "../Layers/LayersContext";

import "../styles/graph-layer-wrapper-styles.css";

function GraphLayerWrapper({ index, children, draggable }) {
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

    return (
        //If not draggable (as in the case with the axes) then no behavior should be defined
        <div>
            <div
                className="GraphLayerWrapper"
                draggable={draggable}
                onDragStart={draggable ? onDragStart : undefined}
                onDragOver={draggable ? onDragOver : undefined}
                onDrop={draggable ? onDrop : undefined}
            ></div>
            {children}
        </div>
    );
}

export default GraphLayerWrapper;
