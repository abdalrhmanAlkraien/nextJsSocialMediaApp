"use client";

import { getPostFeed } from "@/app/actions/post";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Flex, Spin } from "antd";
import Typography from "antd/es/typography/Typography";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Post from "./Post";
// import { useInView } from "react-intersection-observer";

const RetrivePost = () => {

  console.log("render RetrivePost component")   
  const { ref, inView } = useInView();

  const checkLastViewRef = (index, page) => {
    if (index === page?.data?.length - 1) {
      return true;
    } else {
      return false;
    }
  };

  const {
    data,
    isLoading,
    isError,
    isSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = "" }) => getPostFeed(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage?.metadata.lastCursor;
    },
    refetchOnWindowFocus: false, // 👈 prevent on window focus
    refetchOnMount: false, // 👈 prevent when component mounts
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  if (isError) {
    return <Typography>Something went wrong</Typography>;
  }

  if (isSuccess) {
    return (
      <Flex vertical gap={"1rem"}>
        {data?.pages?.map((page) =>
          page?.data?.map((post, index) =>
            checkLastViewRef(index, page) ? (
              <div
                key={post?.id}
                style={{ width: "100%"}}
                ref={checkLastViewRef(index, page) ? ref : null}
              >
                <Post data={post}/>
              </div>
            ) : (
              <div
                key={post?.id}
                style={{ width: "100%"}}
                ref={ref}
              >
                <Post data={post}/>
              </div>
            )
          )
        )}

        {(isLoading || isFetchingNextPage || isFetching) && (
          <Flex vertical align="center" gap="large">
            <Spin />
            <Typography>Loadaing...</Typography>
          </Flex>
        )}
      </Flex>
    );
  }

  return (
    <div>
      <h1>All Posts</h1>
    </div>
  );
};

export default RetrivePost;

