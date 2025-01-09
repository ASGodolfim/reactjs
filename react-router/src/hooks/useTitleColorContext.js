import {  useContext } from "react"
import { TitleColortContext } from "../context/TitleColorContext"

export const useTitleColorContext = () => {
    const context = useContext(TitleColortContext)

    if(!context) {
        console.log("Context not Fount")
    }

    return context;
}