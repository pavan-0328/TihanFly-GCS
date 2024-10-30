import { useState } from "react";
import Button from "./Button";

const Takeoff = () => {
    const [Alt, setAlt] = useState(0);
    const handleTakeoff = () => {
        
    }
    return (
       <Button onClick={handleTakeoff}>Takeoff</Button> 
    );
};

export default Takeoff;