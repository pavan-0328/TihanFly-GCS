import { useReducer } from "react";
import { Children, createContext,useRef } from "react";

const AppContext = createContext();

const AppContextProvider = ({children}) => {
    const selectedDrones = useRef([]);
    return (
        <AppContext.Provider value={{selectedDrones}}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext, AppContextProvider};