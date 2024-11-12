import { useContext, useState } from "react";
import Button from "./Button";
import TakeoffComponent from "./TakeoffComponent";
import Bridge from "../../Networking/Bridge";
import { AppContext } from "../../Context/AppContext";

    

const Takeoff = () => {
    const [Alt, setAlt] = useState();
    const [flag, setflag] = useState(false);
    const bridge = new Bridge();
    const {selectedDrones} = useContext(AppContext);
    const handleTakeoff = async (e)=>{
        await bridge.send({"Alt": Alt},"TAKE_OFF",selectedDrones);
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