import { useEffect, useRef, useState } from "react";

function TikzContainer({ value, setValue }) {
    const [code, setCode] = useState(value ?? "");
    const outputRef = useRef(null);

    const debounceTimer = useRef(null);
    const debouncePending = useRef(false);

    function update(currentCode) {
        if (!outputRef.current) return;

        const s = document.createElement("script");
        s.type = "text/tikz";
        s.setAttribute("data-show-console", "true");
        s.textContent = currentCode;

        outputRef.current.innerHTML = "";
        outputRef.current.appendChild(s);
    }

    function handleInput(e) {
        const newCode = e.target.value;
        setValue(newCode);

        if (debounceTimer.current) {
            debouncePending.current = true;
            return;
        }

        update(newCode);

        debounceTimer.current = setTimeout(() => {
            debounceTimer.current = null;
            if (debouncePending.current) {
                update(newCode);
            }
            debouncePending.current = false;
        }, 200);
    }

    // initial run (equivalent to update() at bottom of your script)
    useEffect(() => {
        update(value);
    }, [value]);

    return (
        <>
            <textarea value={value} onInput={handleInput} id="code" />
            <div ref={outputRef} id="output" />
        </>
    );
}

export default TikzContainer;
