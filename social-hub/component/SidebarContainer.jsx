"use client";
import useWindow from "@/hooks/useWindow";
import { Drawer } from "antd";
import React from "react";

const SidebarContainer = ({
  isDrawOpen,
  setIsDrawOpen,
  children,
  ...other
}) => {
  const { width } = useWindow();

  if (width <= 1268 && isDrawOpen) {
    console.log("less than 1268");
    return (
      <Drawer
        open={true}
        placement="left"
        onClose={() => setIsDrawOpen(false)}
        height={"100%"}
      >
        <div>{children}</div>
      </Drawer>
    );
  } else if(width > 1268){
    console.log("more than 1268");
    return <div>{children}</div>;
  }
};

export default SidebarContainer;
