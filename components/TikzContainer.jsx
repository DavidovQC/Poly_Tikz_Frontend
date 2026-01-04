import { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from "../src/AppContext";

function TikzContainer({ value, setValue }) {
    const { setMySVG, setSVGCode } = useContext(AppContext);
    const [svgText, setSvgText] = useState("");
    const outputRef = useRef(null);

    function update(currentCode) {
        const s = document.createElement("script");
        s.type = "text/tikz";
        s.setAttribute("data-show-console", "true");
        s.textContent = currentCode;
        outputRef.current.innerHTML = "";
        outputRef.current.appendChild(s);
    }

    useEffect(() => {
        console.log("UseEffect called");
        update(value);

        //Make a new observer
        const observer = new MutationObserver(() => {
            const svg = outputRef.current.querySelector("svg");

            if (svg) {
                setMySVG(svg.outerHTML);
                setSvgText(svg.outerHTML);
                setSVGCode(svg.outerHTML);
            }
        });

        //attach it to outputRef.current and its children
        observer.observe(outputRef.current, { childList: true, subtree: true });
        //clean up observer
        return () => observer.disconnect();
    }, [value]);

    return (
        <div style={{ display: "none" }}>
            <textarea value={value} id="code" />
            <textarea value={svgText}></textarea>
            <div ref={outputRef} id="output" />
        </div>
    );
}

export default TikzContainer;
