"use client";
import { Icon } from "@iconify/react";
import { Button } from "antd";
import css from "@/style/sidebarButton.module.css";
import React from "react";
import { useSettingContext } from "@/context/settings/settings-context";

const SidebarButton = () => {
  const { setSettings } = useSettingContext();

  const openMenu = () =>
    console.log(prev.isOpenMenu)
    setSettings((prev) => ({
      ...prev,
      isOpenMenu: prev.isOpenMenu,
    }));

  return (
    <div>
      <Button type="text"
    >
        <Icon icon="material-symbols:menu" className={css.menu} width={22} />
      </Button>
    </div>
  );
};

export default SidebarButton;
