import { getCommentCount } from "@/app/actions/comment";
import { Icon } from "@iconify/react";
import { Button, Typography } from "antd";
import React, { useEffect, useState } from "react";

const CommentButton = ({ post, onclick }) => {
  const [commentCount, setCommentCount] = useState(0);
 useEffect(()=> {

    if(post?.id) {

        setCommentCount(getCommentCount(post))
    }
 }, [post?.id])

  return (
    <Button onClick={onclick}>
      <Icon icon={"material-symbols:comment"} />
      <Typography>Comment</Typography>
      <Typography>{commentCount}</Typography>
    </Button>
  );
};

export default CommentButton;
