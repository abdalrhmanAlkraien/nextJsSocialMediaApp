"use client";

const { useSettingContext } = require("@/context/settings/settings-context");
const { ConfigProvider, theme } = require("antd");
const { useCallback } = require("react");

const ThemeProvider = ({ children }) => {
  const {
    settings: { theme: globalTheme },
  } = useSettingContext();

  const BoxBg = useCallback(() => {
    return globalTheme === "dark" ? "rgb(33,43,54)" : "white";
  }, [globalTheme]);

  const BaseBg = useCallback(() => {
    return globalTheme === "dark" ? "black" : "#F4F6F8";
  }, [globalTheme]);

  console.log("theme")
  return (
    <ConfigProvider
      theme={{
        algorithm:
          globalTheme === "light"
            ? theme.defaultAlgorithm
            : theme.darkAlgorithm,

        token: {
          fontFamily: "inherit",
          colorPrimary: "#F9AA11",
          boxBg: BoxBg(),
          baseBg: BaseBg(),
        },

        components: {
          Typography: {
            fontSize: "none", // Example valid font size
            lineHeight: "none", // Example valid line height
            fontWeightStrong: "none", // Example valid font weight
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
