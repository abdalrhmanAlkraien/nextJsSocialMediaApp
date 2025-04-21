"use client";
import React, { useRef, useState } from "react";
import css from "@/style/PublishPost.module.css";
import { Avatar, Button, Image, Spin, Typography } from "antd";
import { Icon } from "@iconify/react";
import Box from "./box/Box";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/app/actions/post";

const PublishPost = () => {
  const { user } = useUser();
  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const [fileType, setFileType] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isVisable, setIsVisable] = useState(true);
  const [postText, setPostText] = useState(null);
  const queryClient = useQueryClient();

  const { mutate: execute, isPending } = useMutation({
    mutationFn: (data) => createPost(data),
    onSuccess: () => {
      handleSuccess();
      queryClient.invalidateQueries("posts");
    },
    onError: () => {
      showError("something went worng, please try again!!");
    },
  });

  const handleSuccess = () => {
    setSelectedFile(null);
    setFileType(null);
    postText("");
    toast.success("post has been created successfully!");
  };

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (file && file.size > 5 * 1024 * 1024) {
      console.log("the file limit is exceed the limit");
      throw new Error("The file excced the limit");
    }

    if (
      file &&
      (file.type.startsWith("image/") || file.type.startsWith("video/"))
    ) {
      setFileType(file.type.split("/")[0]);

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedFile(reader.result);
      };
    }
  };

  const changePreview = () => {
    setIsVisable(false);
    setFileType(null);
    setSelectedFile(null);
  };

  const showError = (msg = "Something went wrong!!") => {
    toast.error(msg);
  };
  const submitPost = () => {
    if ((postText === "" || !postText) && !selectedFile) {
      showError("the post is empty");
    }

    execute({ postText, media: selectedFile });
  };
  // console.log(user);
  return (
    <>
      <div className={css.wrapper}>
        <Box className={css.container}>
          <div className={css.up_section}>
            <div className={css.avatar_box}>
              <Avatar src={user?.imageUrl} />
            </div>
            <div className={css.text_box}>
              <input
                type="text"
                className={css.text}
                placeholder="Share what do you thinking"
                onChange={(e) => setPostText(e.target.value)}
              />
            </div>
          </div>

          {fileType && (
            <div className={isVisable ? css.previewContainer : css.visable}>
              {fileType === "image" && (
                <div>
                  <Image
                    src={selectedFile}
                    className={css.preview}
                    alt="preview the post"
                    preview={false}
                  />
                  <Button
                    className={css.preview_button}
                    onClick={changePreview}
                  >
                    <Typography>Remove</Typography>
                  </Button>
                </div>
              )}
            </div>
          )}
          <div className={css.down_section}>
            <div className={css.left}>
              {/* Image button*/}

              <Button
                type="text"
                className={css.btn_upload}
                onClick={() => {
                  setIsVisable(true);
                  imageRef.current.click();
                }}
              >
                <div className={css.icon_warpper}>
                  <Icon
                    icon="fluent-color:image-16"
                    className={css.image_icon}
                    width={22}
                  />
                  <span>Image</span>
                </div>
              </Button>
              {/* video button*/}
              <Button
                type="text"
                className={css.btn_upload}
                onClick={() => {
                  setIsVisable(true);
                  videoRef.current.click();
                }}
              >
                <div className={css.icon_warpper}>
                  <Icon
                    icon="fluent-color:video-16"
                    className={css.image_icon}
                    width={22}
                  />
                  <span>Video</span>
                </div>
              </Button>
            </div>

            <div className={css.right}>
              <div className={css.right_warrper}>
                <Button
                  type="text"
                  className={css.btn_upload}
                  onClick={submitPost}
                >
                  <div className={css.icon_warpper}>
                    <Icon
                      icon="material-symbols-light:send-rounded"
                      className={css.image_icon}
                      width={22}
                    />
                    <span>Post</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </Box>

        {/**hidden button  for image*/}
        <input
          type="file"
          accept="image/*"
          multiple={false}
          style={{ display: "none" }}
          ref={imageRef}
          onChange={(e) => handleFile(e)}
        />

        {/**hidden button  for image*/}

        <input
          type="file"
          accept="video/*"
          multiple={false}
          style={{ display: "none" }}
          ref={videoRef}
          onChange={(e) => handleFile(e)}
        />
      </div>
    </>
  );
};

export default PublishPost;
