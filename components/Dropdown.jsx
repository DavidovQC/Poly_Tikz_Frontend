import { useState } from "react";

function Dropdown({ children }) {
    const [display, setDisplay] = useState(false);
    function handleDisplayChange() {
        setDisplay(!display);
        console.log(display);
    }

    return (
        <>
            <button onClick={handleDisplayChange}>∇</button>
            {display && <div className="dropdown-container">{children}</div>}
        </>
    );
}

export default Dropdown;
