import { useState } from "react";
import tihanFly from '../Assets/tihan.png'
import '../Styles/HeaderComponent.css'
const HearderComponent = () =>{

        const [inputValue, setInputValue] = useState('');

    const handleInputChange= (e) =>{
        setInputValue(e.target.value);
    };

    const ConnHandle= (e) => {
        e.preventDefault();
        alert('Input VALUE : ${inputValue}');
    }

    return(
        <div>
        <div className="navbar">
            <form onSubmit={ConnHandle} className="input-form">
                <input type="text" className="vehicle-connect" placeholder="Connection URL..."
                        value={inputValue}
                        onChange={handleInputChange}            
                />
                <button type="submit">Connect</button>
            </form>
            <div class="heading-container">
                <h1><b>TiHAN FLY</b></h1>
            </div>
            <img src={tihanFly} alt="Logo" />
        </div>
        </div>
    );
    
}

export default HearderComponent;