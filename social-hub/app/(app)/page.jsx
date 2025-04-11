"use client";
import PublishPost from "@/component/PublishPost";
import { useSettingContext } from "@/context/settings/settings-context";
import React from "react";
import css from "@/style/main.module.css";

const MainPage = () => {
  return (
    <div className={css.warrper}>
      <div className={css.main}>
        <PublishPost />
      </div>
      <div className={css.side}>
      <h1>Side</h1>
      </div>
    </div>
  );
};

export default MainPage;
