import React from "react";
import css from "@/style/header.module.css";
import Box from "./box/Box";
import { Flex, Image } from "antd";
import ModeButton from "./ModeButton";
import { UserButton } from "@clerk/nextjs";
import SidebarButton from "./SidebarButton";
const Header = () => {
  console.log("header")
  return (
    <div className={css.warrper}>
      <Box
        style={{
          height: "100%",
        }}
      >


        <div className={css.header}>

        <div className={css.sidebarButton}>
          <SidebarButton/>
        </div>
            
          <Image
            src="/images/logo.png"
            width={150}
            height={40}
            alt="logo"
            preview= {false}
            className={css.logo}
          />

          <Flex gap={50} align="center">
          <ModeButton />
          <UserButton afterSignOutUrl="/sign-in"/>
          </Flex>

        </div>
      </Box>
    </div>
  );
};

export default Header;
