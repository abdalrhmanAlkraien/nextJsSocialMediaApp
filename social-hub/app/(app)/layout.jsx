import Box from "@/component/box/Box";
import { SettingsContextProvider } from "@/context/settings/settings-provider";
import ThemeProvider from "@/lib/Theme";
import React from "react";
import css from "@/style/home.module.css";
import Header from "@/component/Header";
import Sidebar from "@/component/Sidebar";
const MainLayout = ({ children }) => {
  return (
    <SettingsContextProvider>
      <ThemeProvider>
        <Box
          children={children}
          type="baseBg"
          style={{
            position: "relative",
            width: "100vm",
            height: "100vh ",
          }}
        >
          <div className={css.warpper}>
            <Header />

            <div className={css.container}>
              <Sidebar/>
              <div className={css.pageBody}>{children}</div>

            </div>

          </div>
        </Box>
      </ThemeProvider>
    </SettingsContextProvider>
  );
};

export default MainLayout;
