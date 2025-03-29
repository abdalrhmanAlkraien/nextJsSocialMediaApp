'use client'
import { useSettingContext } from '@/context/settings/settings-context'
import { Icon } from '@iconify/react';
import { Button } from 'antd';
import React from 'react'

const ModeButton = () => {

    const {setSettings} = useSettingContext();
    const toggleTheme = () => {
        setSettings((prev) => ({
            ...prev,
            theme: prev.theme === "dark" ? "light" : "dark"
        }));
    };
    const DarkIcon = ()=>  <Icon icon={"ic:twotone-dark-mode"} width={"30"}/>
    
  return (
    <div>
        <Button onClick={toggleTheme} icon={<DarkIcon />} style={{ width: "40px",height: "40px"}}/>
    </div>
  )
}

export default ModeButton
