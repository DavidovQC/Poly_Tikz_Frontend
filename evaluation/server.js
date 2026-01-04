const {
    addAxis,
    addPoint,
    docWrap,
    tikzWrap,
    addFunction,
    addCircle,
    addRectnagle,
    addPath,
} = require("./TikzGraphMethods");

function createGraphLayer({ layers }) {
    layers.forEach((layer) => {
        switch (layer.type) {
            case "Axis":
                tikzString = addAxis(tikzString, layer);
                break;
            case "Point":
                tikzString = layer.isVisible
                    ? addPoint(tikzString, layer)
                    : tikzString;
                break;
            case "Function":
                tikzString = layer.isVisible
                    ? addFunction(tikzString, layer, axis)
                    : tikzString;
                break;
            case "Circle":
                tikzString = layer.isVisible
                    ? addCircle(tikzString, layer, axis)
                    : tikzString;
                break;
            case "Rectangle":
                tikzString = layer.isVisible
                    ? addRectnagle(tikzString, layer, axis)
                    : tikzString;
                break;
            case "Path":
                tikzString = addPath(tikzString, layer);
                break;
            default:
                break;
        }
    });

    tikzString = tikzWrap(tikzString);
    console.log(`final result:` + tikzString);
    const preprocessString = docWrap(tikzString);

    return preprocessString;
}

// }

// app.post("/api/getGraphSVGv2", async (req, res) => {
//     console.log("getGraphSVGv2 API endpoint hit");
//     try {
//         console.log("Graph V2 called");
//         console.log(req.body);
//         const axis = req.body[0].AxisType;
//         console.log(`The axis is ${axis}`);
//         tikzString = ``;

//         req.body.forEach((layer) => {
//             switch (layer.type) {
//                 case "Axis":
//                     tikzString = addAxis(tikzString, layer);
//                     break;
//                 case "Point":
//                     tikzString = layer.isVisible
//                         ? addPoint(tikzString, layer)
//                         : tikzString;
//                     break;
//                 case "Function":
//                     tikzString = layer.isVisible
//                         ? addFunction(tikzString, layer, axis)
//                         : tikzString;
//                     break;
//                 case "Circle":
//                     tikzString = layer.isVisible
//                         ? addCircle(tikzString, layer, axis)
//                         : tikzString;
//                     break;
//                 case "Rectangle":
//                     tikzString = layer.isVisible
//                         ? addRectnagle(tikzString, layer, axis)
//                         : tikzString;
//                     break;
//                 case "Path":
//                     tikzString = addPath(tikzString, layer);
//                     break;
//                 default:
//                     break;
//             }
//         });

//         tikzString = tikzWrap(tikzString);
//         console.log(`final result:` + tikzString);
//         const preprocessString = docWrap(tikzString);
//         const finalSVG = await tex2svg(preprocessString);

//         res.status(200).send({ TikZ: preprocessString, SVG: finalSVG });
//     } catch (error) {
//         console.log("Error processing graph", error);
//         res.status(500).json({
//             error: "An error occurred while generating the graph.",
//             errorSVG: "",
//         });
//     }
// });

// app.get("/api/getGraphSVGv2", async (req, res) => {
//     console.log("GET sent");

//     res.state(200).send("GET REQ");
// });

// app.post("/api/postTest", async (req, res) => {
//     console.log("Test API called");
//     console.log(req.body);
//     let svgString = `\\begin{document}
//     \\begin{tikzpicture}

//     \\def\\xscale{1}

//     % grid
//      \\draw[red, thin, step=1] (-2,-2) grid (5,5);

//     % x and y axes
//     \\draw[<->] (-2,0) -- (\\xscale *5, 0);
//     \\draw[<->] (0,-2) -- (0, 5);

//     % tick marks on x axis
//     \\foreach \\x in {-1,1,2,3,4} {
//         \\draw (\\x,0.1) -- (\\x,-0.1) node[below] {\\x};
//     }
//     % draw function
//     \\draw[blue, thick, domain=-2:5, samples=100] plot (\\x,{sin(\\x r)});

//     % node[right] {$f(x) = 2\\sin(x)+1$};

//     \\fill (1,1) circle (2pt);
//     \\fill (3,3) circle (1);
//     \\node[draw, circle, fill=red, inner sep=5pt] at (1,4) {};
//     % draw circle
//     \\draw[green, thick] (0,0) circle (.5in);

//     \\end{tikzpicture}
//     \\end{document}`;
//     const svg = await tex2svg(svgString);
//     res.status(200).type("image/svg+xml").send(svg);
// });

// app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`);
// });
