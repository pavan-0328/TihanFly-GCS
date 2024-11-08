import { AppContext } from "../../Context/AppContext";
import Button from "./Button";
import { useContext, useState } from "react";


const ArmButton = () => {
    const [InnerText, setInnerText] = useState("Arm");
    const {selectedDrones} = useContext(AppContext)


    const handleArmDisarm = async ()=>{
        if(InnerText === "Arm"){
            const error = []
            for(const drone of selectedDrones){
                let uri = "http://127.0.0.1:5000/module/arm/"+drone
                const res = await fetch(uri, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'applicationt/json',
                    }
                })
                if(!res.ok) {
                    error.push(drone)
                }
            }
            setInnerText("Disarm");
        }
        else{
            const error = []
            for(const drone of selectedDrones){
                let uri = "http://127.0.0.1:5000/module/disarm/"+drone
                const res = await fetch(uri, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'applicationt/json',
                    }
                })
                if(!res.ok) {
                    error.push(drone)
                }
            }
            
            setInnerText("Arm");
        }
    };
    return <Button onClick={handleArmDisarm}>{InnerText}</Button>
}

export default ArmButton;