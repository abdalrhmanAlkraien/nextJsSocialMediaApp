import React from "react";
import css from "@/style/header.module.css";
import Box from "./box/Box";
import { Flex, Image } from "antd";
import ModeButton from "./ModeButton";
import { UserButton } from "@clerk/nextjs";
const Header = () => {
  return (
    <div className={css.warrper}>
      <Box
        style={{
          height: "100%",
        }}
      >
        <div className={css.header}>

            
          <Image
            src="/images/logo.png"
            width={150}
            height={40}
            alt="logo"
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
