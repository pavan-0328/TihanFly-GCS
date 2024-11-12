import { useReducer, useState } from "react";
import { Children, createContext,useRef } from "react";

const AppContext = createContext();

const AppContextProvider = ({children}) => {
    const [selectedDrones,addSelected] = useState([1]);
    return (
        <AppContext.Provider value={{selectedDrones}}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext, AppContextProvider};