import { cld } from "@/lib/cloudinary";

export const uploadFile = async (media, path) => {
    try {
        const res = cld.uploader.upload(media, {
            folder: `social-hub/${path}`, resource_type: "auto"
        }, (error, result) => {
            if(error) {
                console.error("issue with upload file", error)
            } else {
                console.log("file uploaded")
            }
        } )

        return res;
    } catch(e) {
        console.error("issue with upload method", e);
        return {
            error: "upload has been field"
        }
    }
}