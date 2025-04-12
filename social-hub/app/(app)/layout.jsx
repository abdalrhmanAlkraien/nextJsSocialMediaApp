import Box from "@/component/box/Box";
import { SettingsContextProvider } from "@/context/settings/settings-provider";
import ThemeProvider from "@/lib/Theme";
import React from "react";
import css from "@/style/home.module.css";
import Header from "@/component/Header";
import Sidebar from "@/component/Sidebar";
import { Toaster } from "react-hot-toast";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
const MainLayout = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <SettingsContextProvider>
      <ThemeProvider>
        <HydrationBoundary state={dehydrate(queryClient)}>
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
                <Sidebar />
                <div className={css.pageBody}>{children}</div>
              </div>
            </div>
          </Box>
        </HydrationBoundary>
        <Toaster />
      </ThemeProvider>
    </SettingsContextProvider>
  );
};

export default MainLayout;
