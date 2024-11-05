import '../Styles/ActionBar.css'
import Button    from './Buttons/Button';
import ArmButton from './Buttons/ArmButton';
import Takeoff from './Buttons/Takeoff';
const ActionBar = () =>{

    const handleLand = ()=>{
        alert("Landing the Drone");
    }
    
    const handleRTL = ()=>{
        alert("RTL activated");
    }
    return(
        <div>
        <div className="ActionBar">
            <ArmButton/>
            <Takeoff/>
            <Button onClick={handleLand}>Land</Button>
            <Button>Waypoint</Button>
            <div class="waypoint-actions" id="waypointActions">
                <Button>Add Waypoint</Button>
                <Button>Upload</Button>
                <Button>Clear</Button>
            </div>
            <Button >Set Flight Mode</Button>
            <Button onClick={handleRTL}>RTL</Button>
            <Button>Spray</Button>
            <Button>Calibrate Level</Button>    
            <div>  </div>
        </div>
        </div>
    );
}
export default ActionBar;