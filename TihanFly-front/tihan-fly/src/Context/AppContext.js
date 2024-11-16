import { useReducer, useState } from "react";
import { Children, createContext,useRef } from "react";

const AppContext = createContext();

const AppContextProvider = ({children}) => {
    const [selectedDrones,addSelected] = useState([]);
    const AddSelected = (item) => {
        console.log(item);
        addSelected(item);
    }
    return (
        <AppContext.Provider value={{selectedDrones,AddSelected}}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext, AppContextProvider};