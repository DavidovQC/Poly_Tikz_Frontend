import { useReducer, createContext } from "react";

const LayerContext = createContext();

let layerIDCounter = 0;

function reducer(layers, action) {
    console.log("dispatch called");
    console.log(layers);
    switch (action.type) {
        case "add_layer":
            return [
                ...layers,
                createLayer(action.payload.type, layerIDCounter++),
            ];

        case "edit_layer":
            return layers.map((layer) =>
                layer.id === action.newLayer.id ? action.newLayer : layer
            );
        case "delete_all_layers":
            return [];

        case "delete_layer":
            return layers.filter((layer) => layer.id != action.payload.id);

        case "move_layer":
            const { fromIndex, toIndex } = action.payload;
            const updated = [...layers];
            const [moved] = updated.splice(fromIndex, 1);
            updated.splice(toIndex, 0, moved);
            return updated;

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
        // "Path",
    ];

    if (!typeList.includes(type)) {
        console.log("Error, invalid type");
        return;
    }

    return {
        id: id,
        type: type,
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
