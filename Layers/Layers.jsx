const { useContext } = require("react");
import GraphPointLayer from "../components/GraphChildLayers/GraphPointLayer";
import { LayerContext } from "./LayersContext";
function Layers() {
    const { Layers, dispatch } = useContext(LayerContext);

    <div>
        {Layers.map((layer) => {
            switch (layer.type) {
                case "point":
                    return (
                        <GraphPointLayer
                            key={layer.id}
                            id={layer.id}
                            dispatch={dispatch}
                        ></GraphPointLayer>
                    );
                default:
                    return <div></div>;
            }
        })}
    </div>;
}

export default Layers;
