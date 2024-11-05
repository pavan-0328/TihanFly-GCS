import { useState } from "react";
import tihanFly from '../Assets/tihan.png'
import Button from "./Buttons/Button";
import '../Styles/HeaderComponent.css'

const HearderComponent = () =>{

    const [connString, setconnString] = useState('');
    const [isConnected, setisConnected] = useState(false);

    const handleConnect= (e) => {
        e.preventDefault();
        console.log(connString);
        setisConnected(!isConnected);
        setconnString("");
    }

    return(
        <div>
        <div className="navbar">
            {!isConnected && 
                <div className="input-form">
                <form onSubmit={handleConnect}>
                    <input type="text" value={connString} onChange={e=>{
                        e.preventDefault();
                        setconnString(e.target.value);
                    }}/>
                    <button typeof="submit">Connect</button>
                </form>
                </div>
            }
            {isConnected && <button onClick={e=>{
                e.preventDefault();
                setisConnected(false);
            }}><b>Disconnect</b></button>}   
            <div class="heading-container">
                <h1><b>TiHAN FLY</b></h1>
            </div>
            <img src={tihanFly} alt="Logo" />
        </div>
        </div>
    );
    
}

export default HearderComponent;