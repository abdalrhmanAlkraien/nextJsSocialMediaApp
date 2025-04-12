'use server'
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { uploadFile } from "./uploadFile";
export const createPost = async (post) => {

    console.log("start create Post method")
    try {
        console.log(post)
        const {postText, media} = post;
        let cld_id;
        let asset_url;
        const user = await currentUser();
        console.log(`the current user is  ${user?.id}`)
        if(media) {
            // upload on cloudinary
            const res = await uploadFile(media, `/posts/${user?.id}`)
            console.log(`the response from cloudinary ${ await res}`)
            const {public_id, secure_url} = res;
            cld_id = public_id
            asset_url = secure_url
        }

        const newPost = await db.Post.create({
            data: {
                postText,
                media: asset_url,
                cld_id,
                author: {
                    connect: {
                        id: user?.id
                    }
                },
                media
                
            }
        })

        console.log(newPost)
        return {
            data: newPost
        }
    } catch(e) {
        console.error("could not save the new post", e)
    }
}