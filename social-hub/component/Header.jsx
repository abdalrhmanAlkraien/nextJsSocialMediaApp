import React from "react";
import css from "@/style/header.module.css";
import Box from "./box/Box";
import { Flex, Image } from "antd";
import ModeButton from "./ModeButton";
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
    <div style={{ display: "flex", alignItems: "center" }}>
    <ModeButton />
    </div>
        </div>
      </Box>
    </div>
  );
};

export default Header;
