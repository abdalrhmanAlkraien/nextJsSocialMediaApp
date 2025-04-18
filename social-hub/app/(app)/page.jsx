"use client";

import React from "react";
import css from "@/style/main.module.css";
import RetrivePost from "@/component/RetrivePost";
import PublishPost from "@/component/PublishPost";

const MainPage = () => {
  return (
    <div className={css.warrper}>
      <div className={css.main}>
        <PublishPost />
        <RetrivePost />
      </div>
      <div className={css.side}>
      <h1>Side</h1>
      </div>
    </div>
  );
};

export default MainPage;
