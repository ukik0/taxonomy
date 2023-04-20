import {withContentlayer} from 'next-contentlayer';

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ['@prisma/client']
    }
};

export default withContentlayer(nextConfig);
