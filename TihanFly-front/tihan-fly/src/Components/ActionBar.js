import '../Styles/ActionBar.css'
import Button    from './Buttons/Button';
import ArmButton from './Buttons/ArmButton';
import Takeoff from './Buttons/Takeoff';
import Bridge from '../Networking/Bridge';
import { AppContext, AppContextProvider } from '../Context/AppContext';
import { useContext } from 'react';

const ActionBar = () =>{
    const {selectedDrones,addSelected} = useContext(AppContext);
    const bridge = new Bridge();
    const handleLand = async()=>{
        alert("Landing the Drone");
        await bridge.send({},"LAND",selectedDrones);
    }
    
    const handleRTL = async()=>{
        alert("RTL activated");
        await bridge.send({"Mode":"RTL"},"MODE_CHANGE",selectedDrones);
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