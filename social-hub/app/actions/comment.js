"use server";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const getCommentCount = async (postId) => {
  try {
    const commentCount = await db.Comment.count({
      where: {
        postId,
      },
    });
    return commentCount;
  } catch (error) {
    console.log("issue with comment count");
    return 0;
  }
};

export const getTopFiveComments = async (postId) => {
  const fetchQuery = {
    where: {
      postId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
        author: true,
        post: true
    },
    take: 5, // set the limit
  };

  try {
    const comments = await db.Comment.findMany(fetchQuery);

    console.log("the comments fetched");
    return comments;
  } catch (error) {
    console.log("issue with get top five comments");
    return null;
  }
};

export const saveComments = async (postId, commentPublished) => {
  console.log("save comment fun");
  console.log(postId);

  const { comment } = commentPublished;
  const user = await currentUser();
  console.log(comment);
  const query = {
    data: {
      comment,
      post: {
        connect: {
          id: postId,
        },
      },
      author: {
        connect: {
          id: user?.id,
        },
      }
    },
  };

  try {
    const savedComment = await db.Comment.create(query);
    console.log(savedComment);
  } catch (error) {
    console.log("issue with save comment");
    throw new Error(`Error saving comment for postId: ${postId}`, {
      cause: error,
    });
  }
};
