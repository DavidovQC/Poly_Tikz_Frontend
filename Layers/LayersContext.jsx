import { useReducer, useContext, createContext } from "react";
import GraphPointLayer from "../components/GraphChildLayers/GraphPointLayer";

const LayerContext = createContext();

function reducer(layers, action) {
    switch (action.type) {
        case "add_layer":
            return [...layers, newLayer(action.payload.type, Date.now())];

        case "edit_layer":
            return layers.map((layer) =>
                layer.id === action.newLayer.id ? newLayer : layer
            );
        default:
            console.log("error");
            return null;
    }
}

function newLayer(type, id) {
    switch (type) {
        case "point":
            return {
                id: id,
                visible: true,
                xValue: 0,
                yValue: 0,
                filled: true,
            };
        default:
            console.log("error, no type");
            return null;
    }
}

export function LayersProvider({ children }) {
    const [layers, dispatch] = useReducer(reducer, []);

    return (
        <LayerContext.Provider value={{ layers, dispatch }}>
            {children}
        </LayerContext.Provider>
    );
}
