"use client";
import { addLike, getLikeCount } from "@/app/actions/like";
import { Icon } from "@iconify/react";
import { Button, Typography } from "antd";
import React, { useEffect, useState } from "react";

const LikeButton = ({ post }) => {
  console.log("the post id is ", post.id);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {

    setLikeCount(getLikeCount(post?.id) ?? 0);
  }, [post?.id]);

  const addNewLike = async () => {
    setLikeCount(prev => prev + 1);
    const count = addLike(post);
    setLikeCount(count);
  }

  return (
    <Button onClick={addNewLike} itemID={post?.id}>
      <Icon icon={"mdi:like"} />
      <Typography>Like</Typography>
      <Typography>{likeCount}</Typography>
    </Button>
  );
};

export default LikeButton;
