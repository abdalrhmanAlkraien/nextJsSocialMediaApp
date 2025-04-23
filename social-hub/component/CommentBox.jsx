"use client";
import { getTopFiveComments, saveComments } from "@/app/actions/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Flex, Form, Image, Input, message, Typography } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import css from "@/style/commentBox.module.css"

const CommentBox = ({post}) => {
  const [form] = useForm();
  const queryClinet = useQueryClient();

  const { mutate: execute, isPending } = useMutation({
    mutationFn: ({postId, comment}) => saveComments(postId, {comment}),
    onSuccess: () => {
      handleSuccess(), queryClinet.invalidateQueries("comment");
    },
    onError: () => {
      showError("The comment has been filed added, please try again!");
    },
  });

  const handleSuccess = () => {
    toast.success("comment has been published successfully!");
  };

  const showError = (message) => {
    toast.error(message);
  };

  const onfinsih = (value) => {
    console.log(post)
    execute({postId: post?.id, comment: value.comment})
    console.log("Manual field value:", form.getFieldValue("comment"));
    toast.success(`the comment has been added successfully ${value}`);
    form.resetFields();
  };

  const onFailed = () => {
    message.error(
      "something went wrong while adding your comment, please try again!!"
    );
  };

  const [comments, setComments] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      if (!post?.id) return;
      const data = await getTopFiveComments(post?.id);
      if (Array.isArray(data)) {
        setComments(data);
      } else {
        return;
      }
    };

    fetchComments();
  }, [post?.id]);

  const renderComments = () => {
    console.log(comments)

    if (comments === null) {
      return;
    } else {
      return (
        <Flex vertical gap={20} style={{ padding: "1rm" }}>
          {
          comments.map((comment) => (
            
            <Flex vertical gap={0.5}>
              <Flex gap={0.3} style={{ width: "30%" }} align="center">
                <Image></Image>
                <Typography className="typoSubtitle2">
                  {comment?.author?.firstName} {comment?.author?.lastName}
                </Typography>
              </Flex>

              <Flex gap={0.3} style={{ width: "30%" }} align="center">
                <Typography.Text
                  className="typoCaption"
                  type="secondary"
                  strong
                >
                  {dayjs(comment?.createdAt).format("DD MM YYYY")}
                </Typography.Text>
              </Flex>
              <Flex  style={{ width: "90%", margin: "0 auto" }} className={css.container}>
                <Typography.Text style={{width: "100%", padding: "1rem"}} className={css.commentBox}>
                  {comment?.comment}
                </Typography.Text>
              </Flex>
            </Flex>
          ))}
        </Flex>
      );
    }
  };

  return (
    <Flex vertical gap={3.5} style={{ width: "100%" }}>
      <Form
        form={form}
        name="commentForm"
        layout="vertical"
        onFinish={onfinsih}
        onFinishFailed={onFailed}
        style={{ width: "100%" }}
      >
        <Form.Item
          name="comment"
          rules={[{ required: true, message: "Please write a comment" }]}
        >
          <Input.TextArea placeholder="Write your comment" rows={4} />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">
            <Typography className="typoBody1">Publish</Typography>
          </Button>
        </Form.Item>
      </Form>

      {renderComments()}
    </Flex>
  );
};

export default CommentBox;
