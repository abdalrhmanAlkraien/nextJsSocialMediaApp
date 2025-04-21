import { Icon } from "@iconify/react";
import { Button, Typography } from "antd";
import React from "react";

const CommentButton = ({post, comment}) => {
  return (
    <Button>
      <Icon icon={"material-symbols:comment"} />
      <Typography>Comment</Typography>
    </Button>
  );
};

export default CommentButton;
