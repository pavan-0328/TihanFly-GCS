import Button from "./Button";
import { useState } from "react";

const ArmButton = () => {
    const [InnerText, setInnerText] = useState("Arm");

    const handleArmDisarm = ()=>{
        if(InnerText === "Arm")
            setInnerText("Disarm");
        else
            setInnerText('Arm');
    };
    return <Button onClick={handleArmDisarm}>{InnerText}</Button>
}

export default ArmButton;