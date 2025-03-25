import { useReducer, createContext } from "react";

const LayerContext = createContext();

function reducer(layers, action) {
    console.log("dispatch called");
    console.log(layers);
    switch (action.type) {
        case "add_layer":
            return [...layers, createLayer(action.payload.type, Date.now())];

        case "edit_layer":
            return layers.map((layer) =>
                layer.id === action.newLayer.id ? action.newLayer : layer
            );
        case "delete_all_layers":
            return [];
        default:
            console.log("error default");
    }
}

function createLayer(type, id) {
    console.log(`the type is + ${type}`);
    switch (type) {
        case "Point":
            console.log("creating point");
            return {
                id: id,
                visible: true,
                type: "Point",
                xValue: 0,
                yValue: 0,

                filled: true,
                size: 1,
            };
        case "Function":
            console.log("creating function");
            return {
                id: id,
                visible: true,
                type: "Function",
                function: null,
                samples: 100,
                thickness: "thick",
            };
        case "Axis":
            console.log("creating Axis");
            return {
                id: id,
                visible: true,
                type: "Axis",
                xAxisSize: 1,
                yAxisSize: 1,
                axisType: "Cross",
                arrowsOn: true,
                xAxisVisible: true,
                yAxisVisible: true,
            };
        default:
            console.log("error, invalid type");
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

export { LayerContext };
