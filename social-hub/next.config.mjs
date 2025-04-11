/** @type {import('next').NextConfig} */
const nextConfig = {

    experimental: {
        serverActions: {
            bodySizeLimit: '6mb'
        }
    }
};

// set the file limit 6mb


export default nextConfig;
