import Dropdown from "../Dropdown";

function VectorLayer() {
    return (
        <div>
            <div>
                <Dropdown label="Vector">
                    <label>single point</label>
                    <input type="number"></input>
                </Dropdown>
            </div>
        </div>
    );
}

export default VectorLayer;
