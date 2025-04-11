import {Cloudinary} from "@cloudinary/url-gen";
import { v2 as cloudinary } from 'cloudinary';

// Configuration
cloudinary.config({ 
    cloud_name: 'dl9yf8z50', 
    api_key: '573152647531598', 
    api_secret: 'SSmlIlRQD4TRRo3wyfYGMW-kYXU' // Click 'View API Keys' above to copy your API secret
});


export const cld = globalThis.cloudinary || cloudinary

if(process.env.NODE_ENV !== 'production') globalThis.cloudinary = cld;