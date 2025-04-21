'use server'
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const addLike = async (post)=> {

    console.log("start add like")
    const user = await currentUser();
    try {

        const like = await db.Like.create({

            data: {
                post: {
                    connect: {
                        id: post?.id
                    }
                },

                author: {
                    connect: {
                        id: user?.id
                    }
                },
            }
        })

        return await getLikeCount(post?.id);
    } catch (error) {

        console.error("here is the err", error);
    }

}

export const getLikeCount = async (postId) => {

    console.log("get like count on post ", postId)
    
    try {
        const count = await db.Like.count({
            where: {
                postId
            }
        })
        
        return count;
    } catch (error) {

        console.error("here is the err", error);
    }
}