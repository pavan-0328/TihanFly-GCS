
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
            },
            "FETCH_LIST":{
                CMD:'/hi',
                METHOD:"GET"
            }
        };
    }
    async simple_send(data={},cmd){
        const {CMD, METHOD}= this.#COMMAND_DICT[cmd];
        const res = await fetch(this.#BASE_URI+CMD,{
            method: METHOD,
            headers:{
                "Content-Type":"application/json"
            }
        });
        if(res.ok){
            data = await res.json();
            return data;
        }
        return res.body;
    }
    async send(data={},cmd,drone_ids){
        const res = [];
        for(const drone_id of drone_ids){
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
                    const data = await temp_res.json();
                    res.push(data);
                }else{
                    temp_res  = await fetch(this.#BASE_URI+CMD+drone_id,{
                        method: METHOD,
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body: JSON.stringify(data)
                    });
                    const data = await temp_res.json();
                    res.push(data);
                }  
            }
        }
        return res;
    }
}

export default Bridge;