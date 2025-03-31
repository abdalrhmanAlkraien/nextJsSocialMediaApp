"use client";
import React from "react";
import Box from "./box/Box";
import css from "@/style/sidebar.module.css";
import { sideBarRoute } from "@/lib/RouteUrl";
import Link from "next/link";
import { Typography } from "antd";
import { Icon } from "@iconify/react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
const Sidebar = () => {

  const route = useRouter();
  const {signOut}= useClerk();

  return (
    <div className={css.warrper}>
      <Box className={css.container}>
        {sideBarRoute().map((route, index) => (
          <Link key={index} href={route.route} className={css.item}>
            <Typography>
              <Icon icon={route.icon} width={"20px"} />
            </Typography>
            <Typography className="typoSubtitle2">{route.name}</Typography>
          </Link>
        ))}

        {
          <Link href={""} onClick={()=> {
            signOut(()=> route.push("/sign-in"))
          }} className={css.item}>
            <Typography>
              <Icon icon="majesticons:logout-half-circle" width={"20px"} />
            </Typography>
            <Typography>Sign out</Typography>
          </Link>
        }
      </Box>
    </div>
  );
};

export default Sidebar;
