import React, { useMemo } from "react";
import Box from "./box/Box";
import { Button, Flex, Image, Typography } from "antd";
import Avatar from "antd/es/avatar/Avatar";
import dayjs from "dayjs";
import css from "@/style/post.module.css";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";


const Post = ({ data }) => {

    // console.log("render post component")
    const post = useMemo(() => data, [data?.id]);


    return (
    <div className={css.wrapper}>
      <Box
        style={
          {
            // height: "300vh ",
          }
        }
      >
        <div className={css.container}>
          <Flex align="center" justify="space-between">
            <Flex align="center" gap={"0.5rem"}>
              <Avatar src={data?.author?.imageUrl} style={{ margin: "1rem" }} />

              <Flex vertical>
                <Typography className="typoSubtitle2">
                  {data?.author?.firstName} {data?.author?.lastName}
                </Typography>

                <Typography.Text
                  className="typoCaption"
                  type="secondary"
                  strong
                >
                  {dayjs(data?.createdAt).format("DD MM YYYY")}
                </Typography.Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex align="center" style={{ padding: ".5rem" }}>
            <Typography.Paragraph className="typoBody1">
              {data?.postText}
            </Typography.Paragraph>
          </Flex>

          <Flex>
            <Image
              src={data?.media}
              style={{ borderRadius: ".5rem" }}
              alt="post image"
              preview={true}
            />
          </Flex>

          <Flex gap={".5rem"}>

            <LikeButton post={post}/>
            <CommentButton post={post} comment={data}/>
          </Flex>
        </div>
      </Box>
    </div>
  );
};

export default Post;
