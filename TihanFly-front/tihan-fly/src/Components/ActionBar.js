import '../Styles/ActionBar.css'
import Button    from './Buttons/Button';
import ArmButton from './Buttons/ArmButton';
import Takeoff from './Buttons/Takeoff';
const ActionBar = () =>{
    return(
        <div>
        <div className="ActionBar">
            <ArmButton/>
            <Takeoff/>
            <button onclick="sendCommand('land')"><b>Land</b></button>
            <button id="waypointButton" onclick="toggleWaypointActions()"><b>Waypoint</b></button>
            <div class="waypoint-actions" id="waypointActions">
                <button onclick="startAddingWaypoints()">Add Waypoint</button>
                <button onclick="sendMarkers()">Send Markers</button>
                <button onclick="clearMarkers()">Clear Markers</button>
            </div>
            <button onclick="showModeDropdown()"><b>Set Flight Mode</b></button>
            <button onclick="sendCommand('rtl')"><b>RTL</b></button>
            <button href="http://192.168.20.162:8080/images_page"> <b>Sprey</b> </button>
            <div>  </div>
        </div>
        </div>
    );
}
export default ActionBar;