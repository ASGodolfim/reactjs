import { createContext, useReducer } from "react";

export const TitleColortContext = createContext()

export const titleColorReducer = (state, action) => {

    switch(action.type) {
        case "RED":
            return {...state, color: "red"}
        case "BLUE":
            return {...state, color: "blue"}
        case "GREEN":
            return {...state, color: "green"}
        default:
            return state;
    }

}

export const TitleColorContextProvider = ({ children }) => {
    
    const [state, dispatch] = useReducer(titleColorReducer, { color: "purple" })
    
    return(
        <TitleColortContext.Provider value={{...state, dispatch}}>
            {children}
        </TitleColortContext.Provider>
    )
}