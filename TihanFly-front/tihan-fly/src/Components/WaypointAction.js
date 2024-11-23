import '../Styles/ActionBar.css'
import Button from './Buttons/Button';
import Bridge from '../Networking/Bridge';
import { useContext } from 'react';
import { AppContext } from '../Context/AppContext';
const WaypointAction = ({waypoints, Add,setAdd, Delete, setDelete}) =>{
    const {selectedDrones, addSelected} = useContext(AppContext);
    const bridge = new Bridge();
    
    const addHandle = ()=>{
        setAdd(true);
        setDelete(false);
    }
    const deleteHandle = () =>{
        setDelete(true);
        setAdd(false);
    }

    const handleUpload= async ()=>{
        const data = waypoints.current
        bridge.send(data,"UPLOAD_WAYPOINT",selectedDrones)
    }

    return (
        <div className='ActionBar'>
        <Button onClick={addHandle}>Add</Button>
        <Button onClick={deleteHandle}>Delete</Button>
        <Button onClick={handleUpload}>Upload</Button>
        <div></div>
        </div>
    )
}

export default WaypointAction;
