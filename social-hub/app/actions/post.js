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
export const getPostFeed = async (lastCursor)=> {
    console.log("Start work")
    try {
        let take = 5;
        
        const fetchQuery = {
            include: {
                author: true,
            },
            take,
            ...(lastCursor && {
                skip: 1,
                cursor: {
                    id: lastCursor
                }
            }),
            orderBy: { 
                createdAt: 'desc'
            }
        };

        const posts = await db.Post.findMany(fetchQuery);


        if(posts.length === 0) {
            {
                return buildResponse()
            }
        } else {
            
            console.log(posts.length)

            const lastPostId = posts[posts.length - 1].id;
            console.log(lastPostId);

            const hasMoreQuery = {
                where: {
                    id: lastPostId
                }
            }
            
            let morePosts = await db.Post.count(hasMoreQuery);
            console.log(`has more ${morePosts}`)

            return buildResponse({
                data: posts,
                lastCursor: lastPostId, 
                hasMore: morePosts.length > 0
            });
        }
        
    } catch (error) {

        console.error(error);

        return buildResponse(); 
    }

}

const buildResponse = ({ data = [], lastCursor = null, hasMore = false } = {}) => {

    return {
      data,
      metadata: {
        lastCursor,
        hasMore,
      },
    };
  };