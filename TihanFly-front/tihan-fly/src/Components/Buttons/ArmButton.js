import { AppContext } from "../../Context/AppContext";
import Button from "./Button";
import { useContext, useState } from "react";
import Bridge from "../../Networking/Bridge";

const ArmButton = () => {
    const [InnerText, setInnerText] = useState("Arm");
    const {selectedDrones} = useContext(AppContext)
    const bridge = new Bridge();

    const handleArmDisarm = async ()=>{
        
        if(InnerText === "Arm"){
            let res = []
            res = await bridge.send({},"ARM",selectedDrones)
            console.log(res)
            setInnerText("Disarm");
        }
        else{
            let res = []
            res = await bridge.send({},"DISARM",selectedDrones)
            setInnerText("Arm");
        }
    };
    return <Button onClick={handleArmDisarm}>{InnerText}</Button>
}

export default ArmButton;