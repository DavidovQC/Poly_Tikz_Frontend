import { useReducer, createContext, useContext } from "react";
import { AppContext } from "../src/AppContext";
import { createGraphLayer } from "../evaluation/TikzGraphMethods";

const LayerContext = createContext();

let layerIDCounter = 0;

// const { setLatexCode } = useContext(AppContext);

function reducer(layers, action) {
    console.log("dispatch called");
    console.log(layers);
    switch (action.type) {
        case "add_layer":
            console.log("add_layer called");
            return [
                ...layers,
                createLayer(action.payload.type, layerIDCounter++),
            ];

        case "edit_layer":
            console.log("edit_layer called");

            const newLayers = layers.map((layer) =>
                layer.id === action.newLayer.id ? action.newLayer : layer
            );

            console.log("newLayers object is:");
            console.log(newLayers);

            // setLatexCode(createGraphLayer(newLayers));

            return newLayers;
        case "delete_all_layers":
            return [];

        case "delete_layer":
            console.log("delete_layers called");
            return layers
                .filter((layer) => layer.id !== action.payload.id)
                .map((layer) => ({ ...layer }));

        case "move_layer":
            const { fromIndex, toIndex } = action.payload;
            const updated = [...layers];
            const [moved] = updated.splice(fromIndex, 1);
            updated.splice(toIndex, 0, moved);
            return updated;

        case "toggle_visible":
            return layers.map((layer) =>
                layer.id === action.payload.id
                    ? { ...layer, isVisible: !layer.isVisible }
                    : layer
            );

        default:
            console.log("error default");
    }
}

function createLayer(type, id) {
    console.log(`the type is + ${type}`);
    const typeList = [
        "Axis",
        "Function",
        "Circle",
        "Rectangle",
        "Point",
        "Test",
    ];

    if (!typeList.includes(type)) {
        console.log(
            "Error, invalid layerType created in createLayer <- LayersContext. Check typeList."
        );
        return;
    }

    console.log("Layer created in createLayer");

    return {
        id: id,
        type: type,
        isVisible: true,
    };
}

export function LayersProvider({ children }) {
    const [layers, dispatch] = useReducer(reducer, []);

    return (
        <LayerContext.Provider value={{ layers, dispatch }}>
            {children}
        </LayerContext.Provider>
    );
}

export { LayerContext };
