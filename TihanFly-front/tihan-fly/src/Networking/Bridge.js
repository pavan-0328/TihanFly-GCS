
class Bridge{
    #BASE_URI;
    #COMMAND_DICT;
    constructor(){
        this.#BASE_URI = "http://127.0.0.1:5000/api";
        this.#COMMAND_DICT= {
            "ARM": {
                CMD: "/arm/",
                METHOD: "GET"
            },
            "DISARM": {
                CMD: "/disarm/",
                METHOD: "GET"
            },
            "LAND": {
                CMD: "/land/",
                METHOD: "GET"
            },
            "MODE_CHANGE": {
                CMD: "/change-mode/",
                METHOD: "POST"
            },
            "GET_LOCATION":{
                CMD: "/get-location/",
                METHOD: "GET"
            },
            "TAKE_OFF":{
                CMD:'/takeoff/',
                METHOD:"POST"
            }
        };
    }
    async send(data={},cmd,drone_ids){
        for(const drone_id of drone_ids){
            let res = [];
            console.log(drone_id)
            if(this.#COMMAND_DICT.hasOwnProperty(cmd)){
                const {CMD, METHOD}= this.#COMMAND_DICT[cmd];
                let temp_res = {};
                if(METHOD === "GET") 
                {   temp_res = await fetch(this.#BASE_URI+CMD+drone_id,{
                        method: METHOD,
                        headers:{
                            "Content-Type":"application/json"
                        }
                    });
                    res.push(temp_res);
                }else{
                    temp_res  = await fetch(this.#BASE_URI+CMD+drone_id,{
                        method: METHOD,
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body: JSON.stringify(data)
                    });
                    res.push(temp_res)
                }  
            }else{
                res.push({"ERROR": "Command not found"});
            }
        }
    }
}

export default Bridge;