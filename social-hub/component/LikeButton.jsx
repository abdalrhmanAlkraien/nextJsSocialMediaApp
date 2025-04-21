"use client";
import { addLike, getLikeCount } from "@/app/actions/like";
import { Icon } from "@iconify/react";
import { Button, Typography } from "antd";
import React, { useEffect, useState } from "react";

const LikeButton = ({ post }) => {
//   console.log("render Like Button component ", post.id);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {

    if (!post?.id) return;

    const count = getLikeCount(post.id) ?? 0;
    setLikeCount(prev => (prev !== count ? count : prev));

  }, [post?.id]);

  const addNewLike = async () => {
    const count = await addLike(post); // assume it returns correct new count
    setLikeCount(prev => (prev !== count ? count : prev)); // update only if needed
  };

  return (
    <Button onClick={addNewLike} itemID={post?.id}>
      <Icon icon={"mdi:like"} />
      <Typography>Like</Typography>
      <Typography>{likeCount}</Typography>
    </Button>
  );
};

export default LikeButton;
