interface RoutePaths {
    ROOT: string;
    FEATURES: string;
    PRICING: string;
    BLOG: string;
    DOCUMENTATION: string;
    CONTACT: string;
    LOGIN: string;
    REGISTER: string;
    TERMS: string;
    PRIVACY: string;
}

export const Routes: Record<keyof RoutePaths, `/${string}`> = {
    ROOT: '/',
    FEATURES: '/features',
    PRICING: '/pricing',
    BLOG: '/blog',
    DOCUMENTATION: '/docs',
    CONTACT: '/contact',
    LOGIN: '/login',
    REGISTER: '/register',
    TERMS: '/terms',
    PRIVACY: '/privacy'
}
