"use client";
import React, { useCallback } from "react";
import Box from "./box/Box";
import css from "@/style/sidebar.module.css";
import { sideBarRoute } from "@/lib/RouteUrl";
import Link from "next/link";
import { Typography } from "antd";
import { Icon } from "@iconify/react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import cx from "classnames";
import SidebarContainer from "./SidebarContainer";
import { useSettingContext } from "@/context/settings/settings-context";

const Sidebar = () => {
  const route = useRouter();
  const { signOut } = useClerk();
  const pathname = useRouter();

  const isActiveRoute = (route) => {
    if (route.route === pathname || route.route === "/") return css.active;
  };

  const isActiveText = (route) => {
    return isActiveRoute(route) && "var(--primary)";
  };

  const {
    settings: { isOpenMenu },
    setSettings,
  } = useSettingContext();

  const handleClose = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      isOpenMenu: false,
    }));
  }, [setSettings]);

  console.log('sidebar')
  return (
    <SidebarContainer isDrawOpen={isOpenMenu} setIsDrawOpen={handleClose}>
      <div className={css.warrper}>
        <Box className={css.container}>
          {sideBarRoute().map((route, index) => (
            <Link
              key={index}
              href={route.route}
              className={cx(css.item, isActiveRoute(route))}
            >
              <Typography
                style={{
                  color: isActiveText(route),
                }}
              >
                <Icon icon={route.icon} width={"20px"} />
              </Typography>
              <Typography
                style={{
                  color: isActiveText(route),
                }}
              >
                {route.name}
              </Typography>
            </Link>
          ))}

          {
            <Link
              href={""}
              onClick={() => {
                signOut(() => route.push("/sign-in"));
              }}
              className={css.item}
            >
              <Typography>
                <Icon icon="majesticons:logout-half-circle" width={"20px"} />
              </Typography>
              <Typography>Sign out</Typography>
            </Link>
          }
        </Box>
      </div>
    </SidebarContainer>
  );
};

export default Sidebar;
