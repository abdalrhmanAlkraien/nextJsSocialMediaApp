"use client";
import { Icon } from "@iconify/react";
import { Button } from "antd";
import css from "@/style/sidebarButton.module.css";
import React, { useEffect } from "react";
import { useSettingContext } from "@/context/settings/settings-context";

const SidebarButton = () => {
  const { setSettings } = useSettingContext();

  const openMenu = () => {
    setSettings((prev) => ({
      ...prev,
      isOpenMenu: !prev.isOpenMenu,
    }));
  };

  return (
    <div>
      <Button type="text"
      onClick={openMenu}
    >
        <Icon icon="material-symbols:menu" className={css.menu} width={22} />
      </Button>
    </div>
  );
};

export default SidebarButton;
