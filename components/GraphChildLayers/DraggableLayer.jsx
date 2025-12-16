import Dropdown from "../Dropdown";

function Draggable() {
    return (
        <Dropdown label={"Draggable"} draggable={true}>
            <div>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolore, non possimus vero reiciendis nesciunt, rem cum iste
                    ipsa ducimus facere molestiae fugit ad ea aliquid dolorum
                    molestias. Labore, eveniet esse.
                </p>
            </div>

            <Dropdown label={"Test dropdown"}></Dropdown>
        </Dropdown>
    );
}

export default Draggable;
