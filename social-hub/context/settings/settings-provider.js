"use client"

import { useState } from "react"
import { SettingContext } from "./settings-context"
import { theme } from "antd"

export const SettingsContextProvider = ({children}) => {

    const [settings, setSettings] = useState({

        theme: "dark",
        isOpenMenu: false
    })

    return (
        <SettingContext.Provider value={{settings, setSettings}}>
            {children}
        </SettingContext.Provider>
    )
}