import { useContext, useState, useEffect} from "react";
import tihanFly from '../Assets/tihan.png'
import '../Styles/HeaderComponent.css'
import { AppContext } from "../Context/AppContext";
import Bridge from "../Networking/Bridge";
import { add } from "ol/coordinate";
const HearderComponent = () =>{

    const [connString, setconnString] = useState('');
    const [isConnected, setisConnected] = useState(false);
    const {selectedDrones} = useContext(AppContext);
    const {AddSelected} = useContext(AppContext);
    const bridge = new Bridge();
    const handleConnect= async (e) => {
        e.preventDefault();
        const res = await bridge.simple_send({},"FETCH_LIST")
        const drone_ids = res.DroneKeys;
        console.log(drone_ids);       
        AddSelected(drone_ids);
        setisConnected(!isConnected);
        setconnString("");
    };

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