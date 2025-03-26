'use client'
import { useContext, createContext } from "react"

export const SettingContext = createContext({})

export const useSettingContext = ()=> {

    const context = useContext(SettingContext);

    if(!context) {
        throw new Error("use context must be use within the theme");
    }

    return context;
};