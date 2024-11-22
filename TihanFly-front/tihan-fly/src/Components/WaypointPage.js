import MapComponent from "./MapComponent";
import WaypointAction from "./WaypointAction";
import { useState,useRef } from "react";
import WaypointMap from "./WaypointMap";
const WaypointPage = () => {
    const [Add, setAdd] = useState(false);
    const [Delete,setDelete] = useState(false);
    const waypoints = useRef({});
    return (
        <>
        <WaypointAction waypoints={waypoints} Add = {Add} setAdd={setAdd} Delete={Delete} setDelete={setDelete}/>
        <WaypointMap waypoints={waypoints} Add = {Add} setAdd={setAdd} Delete={Delete} setDelete={setDelete}/>
        </>
    );
};

export default WaypointPage;