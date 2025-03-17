import Dropdown from "../Dropdown";

function GraphPointLayer() {
    return (
        <div>
            <div>
                <Dropdown label="Point">
                    <div>
                        <label>Coordinates:</label>
                        <label>x</label>
                        <input type="number" defaultValue={0}></input>
                        <label>y</label>
                        <input type="number" defaultValue={0}></input>
                    </div>
                </Dropdown>
            </div>
        </div>
    );
}

export default GraphPointLayer;
