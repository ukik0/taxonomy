import {withContentlayer} from "next-contentlayer"

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["avatars.githubusercontent.com"],
    },
    experimental: {
        appDir: true,
    },
}

export default withContentlayer(nextConfig)