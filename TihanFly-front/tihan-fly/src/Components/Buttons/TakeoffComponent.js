import '../../Styles/Button.css'
const TakeoffComponent = ({Alt, setAlt,setflag}) => {
    return (<div className="form-component">
                
                <form onSubmit={(e) => {
                        e.preventDefault();
                        console.log(Alt);
                        setflag(false);
                }} >
                    <button typeof="submit">Takeoff</button>
                    <input  
                        onChange={(e) =>{
                            e.preventDefault();
                            setAlt(e.target.value);
                        }}
                        type="number"
                        value={Alt}     
                    />
                </form>
    </div>);
}

export default TakeoffComponent;