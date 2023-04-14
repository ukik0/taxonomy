type ReactTagProps<T> = import('react').ComponentPropsWithRef<T>;

interface SiteConfig {
    name: string;
    description: string;
    url: string;
    ogImage: string;
    links: {
        twitter: string;
        github: string;
    };
}

interface NavItem {
    title: string;
    href: string;
    disabled?: boolean;
}

