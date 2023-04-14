interface RoutePaths {
    ROOT: string;
    FEATURES: string;
    PRICING: string;
    BLOG: string;
    DOCUMENTATION: string;
    CONTACT: string;
    LOGIN: string
}

export const Routes: Record<keyof RoutePaths, `/${string}`> = {
    ROOT: '/',
    FEATURES: '/features',
    PRICING: '/pricing',
    BLOG: '/blog',
    DOCUMENTATION: '/docs',
    CONTACT: '/contact',
    LOGIN: '/login'
};
