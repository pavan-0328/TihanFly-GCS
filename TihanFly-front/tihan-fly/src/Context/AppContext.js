import { Children, createContext,useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({children}) => {
    return (
        <AppContext.Provider value={{value,setValue}}>
            {children}
        </AppContext.Provider>
    )
}

export {AppContext, AppContextProvider};