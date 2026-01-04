export function createGraphLayer(layers) {
    if (layers.length == 0) return "";
    const axis = layers[0].AxisType;
    let tikzString = ``;

    layers.forEach((layer) => {
        switch (layer.type) {
            case "Axis":
                tikzString = addAxis(tikzString, layer);
                break;
            case "Points":
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
function addAxis(string, axis) {
    //general axis settings
    let axisRayX;
    let axisRayY;
    //Axis settings
    //x axis settings
    let xAxisX1;
    let xAxisY1;

    let xAxisX2;
    let xAxisY2;

    //y axis settings
    let yAxisX1;
    let yAxisY1;

    let yAxisX2;
    let yAxisY2;

    //clip settings
    let clipDiff;
    let clipX1;
    let clipY1;
    let clipX2;
    let clipY2;

    //tick limits
    let xTicksStart;
    let xTicksEnd;
    let yTicksStart;
    let yTicksEnd;

    const xInt = parseInt(axis.xAxisSize); //integer part of x
    const yInt = parseInt(axis.yAxisSize); //integer part of y

    const axisColor = axis.axisColor
        ? hexToRGB(axis.axisColor)
        : `{RGB}{0, 0, 0}`;

    switch (axis.AxisType) {
        case "Cross":
            console.log("CROSS");
            //general axis settings
            axisRayX = axis.arrowsOn ? "<->" : "-";
            axisRayY = axis.arrowsOn ? "<->" : "-";

            ///Axis Settings
            //x axis settings
            xAxisX1 = `-\\xAxisScale`;
            xAxisY1 = `0`;

            xAxisX2 = `\\xAxisScale`;
            xAxisY2 = `0`;

            //y axis settings
            yAxisX1 = `0`;
            yAxisY1 = `-\\yAxisScale`;

            yAxisX2 = `0`;
            yAxisY2 = `\\yAxisScale`;

            //clip settings
            clipX1 = `-\\xAxisScale`;
            clipY1 = `-\\yAxisScale`;

            clipX2 = `\\xAxisScale`;
            clipY2 = `\\yAxisScale`;
            //clip settings
            clipDiff = `.01`;

            //ticks settings
            xTicksStart = -xInt;
            xTicksEnd = xInt;

            yTicksStart = -yInt;
            yTicksEnd = yInt;

            break;

        case "L-Shape":
            console.log("L-Shape");
            //general axis settings
            axisRayX = axis.arrowsOn ? "->" : "-";
            axisRayY = axis.arrowsOn ? "->" : "-";

            //x axis settings
            xAxisX1 = `0`;
            xAxisY1 = `0`;

            xAxisX2 = `\\xAxisScale`;
            xAxisY2 = `0`;

            //y axis settings
            yAxisX1 = `0`;
            yAxisY1 = `0`;

            yAxisX2 = `0`;
            yAxisY2 = `\\yAxisScale`;

            //clip settings
            clipDiff = `.1`;

            //ticks settings
            xTicksStart = 0; //x1
            xTicksEnd = xInt; //x2

            yTicksStart = 0; //y1
            yTicksEnd = yInt; //y2

            break;

        case "Up-T-Bar":
            console.log("Up-T-Bar");
            //general axis settings
            axisRayX = axis.arrowsOn ? "<->" : "-";
            axisRayY = axis.arrowsOn ? "->" : "-";

            //x axis settings
            xAxisX1 = `-\\xAxisScale`;
            xAxisY1 = `0`;

            xAxisX2 = `\\xAxisScale`;
            xAxisY2 = `0`;

            //y axis settings
            yAxisX1 = `0`;
            yAxisY1 = `0`;

            yAxisX2 = `0`;
            yAxisY2 = `\\yAxisScale`;

            //clip settings
            clipDiff = `.1`;

            //ticks settings
            xTicksStart = -xInt; //x1
            xTicksEnd = xInt; //x2

            yTicksStart = 0; //y1
            yTicksEnd = yInt; //y2

            break;

        case "Side-T-Bar":
            console.log("Up-T-Bar");
            //general axis settings
            axisRayX = axis.arrowsOn ? "->" : "-";
            axisRayY = axis.arrowsOn ? "<->" : "-";

            //x axis settings
            xAxisX1 = `0`;
            xAxisY1 = `0`;

            xAxisX2 = `\\xAxisScale`;
            xAxisY2 = `0`;

            //y axis settings
            yAxisX1 = `0`;
            yAxisY1 = `-\\yAxisScale`;

            yAxisX2 = `0`;
            yAxisY2 = `\\yAxisScale`;

            //clip settings
            clipDiff = `.1`;

            //ticks settings
            xTicksStart = 0; //x1
            xTicksEnd = xInt; //x2

            yTicksStart = -yInt; //y1
            yTicksEnd = yInt; //y2

            break;
    }
    //set definitions
    string =
        `\\def\\xAxisScale{${axis.xAxisSize}}` +
        `\n` +
        `\\def\\yAxisScale{${axis.yAxisSize}} ` +
        `\n` +
        `\\definecolor{axisColor}${axisColor} ` +
        `\n` +
        string;

    //set clip
    string =
        string +
        `\n` +
        `\\clip (${xAxisX1} - ${clipDiff},${yAxisY1} - ${clipDiff}) rectangle (${xAxisX2}+${clipDiff}, ${yAxisY2} + ${clipDiff});` +
        `\n`;

    //create grid:
    if (axis.gridOn) {
        const gridColor = axis.gridColor
            ? hexToRGB(axis.gridColor)
            : `{RGB}{0, 0, 0}`;

        string = string + `\\definecolor{gridColor}${gridColor}` + `\n`;

        string =
            `\n` +
            string +
            `\n` +
            `\\def\\gridStep{${axis.gridStep}}` +
            `\n` +
            `\\draw[gridColor, thin, step=\\gridStep] (${xAxisX1},${yAxisY1}) grid (${xAxisX2},${yAxisY2});` +
            `\n`;
    }

    //draw axes
    string = axis.xAxisVisible
        ? string +
          `\n` +
          `\\draw[${axisRayX}, axisColor] (${xAxisX1}, ${xAxisY1}) -- (${xAxisX2},${xAxisY2});` +
          `\n`
        : string;

    string = axis.yAxisVisible
        ? string +
          `\n` +
          `\\draw[${axisRayY}, axisColor] (${yAxisX1},${yAxisY1}) -- (${yAxisX2},${yAxisY2});` +
          `\n`
        : string + `\n`;

    //Ticks Settings
    //Draw tick marks on X
    if (axis.ticksOnX) {
        string =
            string +
            `\n` +
            `\\foreach \\x in {${xTicksStart}, ${
                xTicksStart + 1
            },...,${xTicksEnd}} {` +
            `\n` +
            `   \\draw (\\x ,0.1) -- (\\x,-0.1);` + //node[below] {\\x}
            `\n` +
            `}` +
            `\n`;
    }

    if (axis.ticksOnY) {
        string =
            string +
            `\n` +
            `\\foreach \\y in {${yTicksStart}, ${
                yTicksStart + 1
            },...,${yTicksEnd}} {` +
            `\n` +
            `   \\draw (0.1, \\y) -- (-0.1, \\y);` + //node[below] {\\x}
            `\n` +
            `}` +
            `\n`;
    }

    return string;
}

function addPoint(string, point, axis) {
    console.log("addPoints was called");
    console.log("points.pointsList is:");
    console.log(point.pointsList);

    const pointsList = parsePoints(point.pointsList);
    const pointsLabels = parseLabels(point.pointLabel);

    console.log(point.pointLabel);
    console.log("pointsLabel is:");
    console.log(pointsLabels);

    string = string + `\n` + "%<-------------- Point -------------->%" + `\n`;

    string =
        string +
        `\n` +
        `\\definecolor{pointRadialColor}${hexToRGB(point.radialColor)}` +
        `\n`;

    string = point.fillOn
        ? string +
          `\\definecolor{pointFillColor}${hexToRGB(point.fillColor)}` +
          `\n`
        : string;

    for (let i = 0; i < pointsList.length; i++) {
        string =
            string +
            `\n` +
            `\\node[draw=pointRadialColor,${
                point.fillOn ? "fill = pointFillColor," : "fill=none,"
            } circle, inner sep=${point.size}pt,`;

        if (i < pointsLabels.length) {
            string =
                string +
                ` label={${point.labelOrientation}:${pointsLabels[i]}}] at (${pointsList[i][0]},${pointsList[i][1]}) {};` +
                `\n`;
        } else {
            string =
                string +
                ` label={${point.labelOrientation}:}] at (${pointsList[i][0]},${pointsList[i][1]}) {};` +
                `\n`;
        }
    }

    return string;
}

function addFunction(string, func, axis) {
    string =
        string + `\n` + "%<-------------- Function -------------->%" + `\n`;

    if (func.functionInput) {
        const domainString = createDomainString(axis);
        const clipString = createClipString(axis);

        string =
            string +
            `\n` +
            clipString +
            `\n` +
            `\\definecolor{functionColor}${hexToRGB(func.color)}`;

        string =
            string +
            `\n` +
            `\n` +
            `\\draw[functionColor, ${func.thickness}, ${func.stroke}, ${domainString}, samples=${func.samples}] plot (\\x,{${func.functionInput}});` +
            `\n`;
    }

    return string;
}

function addCircle(string, circle, axis) {
    string = string + `\n` + "%<-------------- Circle -------------->%" + `\n`;

    let clipString;
    switch (axis) {
        case "Cross":
            clipString =
                "\\clip (-\\xAxisScale,-\\yAxisScale) rectangle (\\xAxisScale, \\yAxisScale);";
            break;
        case "L-Shape":
            clipString = "\\clip (0,0) rectangle (\\xAxisScale, \\yAxisScale);";
            break;
        case "Up-T-Bar":
            clipString =
                "\\clip (-\\xAxisScale,0) rectangle (\\xAxisScale, \\yAxisScale);";
            break;
        case "Side-T-Bar":
            clipString =
                "\\clip (0,-\\yAxisScale) rectangle (\\xAxisScale, \\yAxisScale);";
            break;
    }

    string =
        string +
        `\n` +
        `\\definecolor{circleColor}${hexToRGB(circle.color)}` +
        `\n`;

    string = string + clipString + `\n`;

    string =
        string +
        `\n` +
        `\\draw[circleColor, thick] (${circle.xOrigin},${circle.yOrigin}) circle (${circle.radius});` +
        `\n`;

    return string;
}

function addRectnagle(string, rectangle, axis) {
    string =
        string + `\n` + "%<-------------- Rectangle -------------->%" + `\n`;

    const basePt = rectangle.posCenter
        ? parse2DPt(rectangle.centerValue)
        : parse2DPt(rectangle.bottomValue);

    const x = basePt[0];
    const y = basePt[1];

    const width = rectangle.width;
    const height = rectangle.height;

    const clipString = createClipString(axis);

    string = string + `\n` + clipString + `\n`;

    string =
        string +
        `\\def\\x{${x}}` +
        `\n` +
        `\\def\\y{${y}}` +
        `\n` +
        `\\def\\width{${width}}` +
        `\n` +
        `\\def\\height{${height}}` +
        `\n\n`;

    const drawString = rectangle.posCenter
        ? `\\draw (\\x - 0.5*\\width, \\y - 0.5*\\height) rectangle (\\x + 0.5*\\width, \\y + 0.5*\\height);`
        : `\\draw (\\x, \\y) rectangle (\\x + \\width, \\y + \\height);`;

    string = string + drawString + `\n`;

    if (rectangle.fill) {
        const color = hexToRGB(rectangle.fillColor);
        const opacity = rectangle.opacity / 100;
        string = string + `\\definecolor{fillColor}${color}` + `\n`;
        const fillString = rectangle.posCenter
            ? `\\filldraw[fill=fillColor, fill opacity = ${opacity}] (\\x - 0.5*\\width, \\y - 0.5*\\height) rectangle (\\x + 0.5*\\width, \\y + 0.5*\\height);`
            : `\\filldraw[fill=fillColor, fill opacity = ${opacity}] (\\x, \\y) rectangle (\\x + \\width, \\y + \\height);`;
        string = string + fillString;
    }

    //   % Filled black rectangle
    //   \fill (0,0) rectangle (1,1);

    // fill without border
    //   % Filled red rectangle with border
    //   \filldraw[fill=red, draw=black] (2,0) rectangle (3,1);

    //opacity

    // \fill[red, opacity=0.5] (0,0) rectangle (1,1);

    // % Same but with border
    // \filldraw[fill=blue, opacity=0.3, draw=black] (2,0) rectangle (3,1);
    // \end{tikzpicture}

    return string;
}

function addPath(string, path) {
    points = parsePoints(path.points);

    string =
        string +
        `\n` +
        `\\draw[thick, black]` +
        `\n` +
        pathToTikz(points) +
        `\n`;

    return string;
}

function addNode(string, graphNode) {}

////////////////////////////////////////////////////////////////////////
////////Helper Methods////////
////////////////////////////////////////////////////////////////////////

function tikzWrap(string) {
    return (
        `\\begin{tikzpicture}` +
        `\n\n` +
        string +
        `\n\n` +
        `\\end{tikzpicture} `
    );
}

function docWrap(string) {
    const sandwichtedString =
        `\\begin{document}` + `\n` + string + `\n` + `\\end{document}`;

    return sandwichtedString;
}

function hexToRGB(hex) {
    hex = hex.replace("#", "");

    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    const rgbString = `{RGB}{${r}, ${g}, ${b}}`;

    return rgbString;
}

function parse2DPt(string) {
    const regex = /\s*\(\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)\s*\)\s*/;

    const match = string.match(regex);
    if (!match) {
        return null;
    }

    const x = match[1];
    const y = match[2];

    return [x, y];
}

function parsePoints(str) {
    const regex = /\(\s*(-?\d*\.?\d+)\s*,\s*(-?\d*\.?\d+)\s*\)/g;
    const points = [];
    let match;

    while ((match = regex.exec(str)) !== null) {
        points.push([match[1], match[2]]);
    }

    return points;
}

function parseLabels(str) {
    console.log("parseLabels called");
    return str
        .split(",") // split on commas
        .map((s) => s.trim()) // remove spaces and line breaks
        .filter((s) => s.length > 0); // drop empty entries
}

function pathToTikz(points) {
    const tikz = points.map((pt) => `(${pt[0]}, ${pt[1]})`).join("--");

    return `${tikz};`;
}

function createClipString(axis) {
    let clipString;

    switch (axis) {
        case "Cross":
            clipString =
                "\\clip (-\\xAxisScale,-\\yAxisScale) rectangle (\\xAxisScale, \\yAxisScale);";
            break;
        case "L-Shape":
            clipString = "\\clip (0,0) rectangle (\\xAxisScale, \\yAxisScale);";
            break;
        case "Up-T-Bar":
            clipString =
                "\\clip (-\\xAxisScale,0) rectangle (\\xAxisScale, \\yAxisScale);";
            break;
        case "Side-T-Bar":
            clipString =
                "\\clip (0,-\\yAxisScale) rectangle (\\xAxisScale, \\yAxisScale);";
            break;
    }

    return clipString;
}

function createDomainString(axis) {
    let domainString;

    switch (axis) {
        case "Cross":
            domainString = "domain=-\\xAxisScale:\\xAxisScale";
            break;
        case "L-Shape":
            domainString = "domain=0:\\xAxisScale";
            break;
        case "Up-T-Bar":
            domainString = "domain=-\\xAxisScale:\\xAxisScale";
            break;
        case "Side-T-Bar":
            domainString = "domain=0:\\xAxisScale";
            break;
    }

    return domainString;
}
