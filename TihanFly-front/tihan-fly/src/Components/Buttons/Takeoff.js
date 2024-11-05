import { useState } from "react";
import Button from "./Button";
import TakeoffComponent from "./TakeoffComponent";


    

const Takeoff = () => {
    const [Alt, setAlt] = useState();
    const [flag, setflag] = useState(false);
    const handleTakeoff = (e)=>{
        setflag(true);
    }
    if(flag){
        return (
            <TakeoffComponent Alt={Alt} setAlt={setAlt} setflag={setflag}/>
        );
    }else{
        return <Button onClick={handleTakeoff}>Takeoff</Button>
    }
};

export default Takeoff;