'use server'
import { db } from "@/lib/db";

export const getCommentCount = async (postId) => {

    try {
        const commentCount = await db.Comment.count({
            where: {
                postId
            }
        });
    
        return commentCount;
    } catch(error) {

        console.log("issue with comment count")
        return 0;
    }
} 