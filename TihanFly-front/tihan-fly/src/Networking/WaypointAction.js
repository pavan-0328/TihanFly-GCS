import '../Styles/ActionBar.css'
import Button from './Buttons/Button';
const WaypointAction = ({Add,setAdd, Delete, setDelete}) =>{

    
    const addHandle = ()=>{
        setAdd(true);
        setDelete(false);
    }
    const deleteHandle = () =>{
        setDelete(true);
        setAdd(false);
    }

    return (
        <div className='ActionBar'>
        <Button onClick={addHandle}>Add</Button>
        <Button onClick={deleteHandle}>Delete</Button>
        <Button>Upload</Button>
        <div></div>
        </div>
    )
}

export default WaypointAction;