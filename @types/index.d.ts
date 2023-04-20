import {Icons} from "@/components/common/icons";

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

export type SidebarNavItem = {
    title: string;
    disabled?: boolean;
    external?: boolean;
    icon?: keyof typeof Icons;
} & (
    | {
          href: string;
          items?: never;
      }
    | {
          href?: string;
          items: NavLink[];
      }
);

type DashboardConfig = {
    mainNav: NavItem[];
    sidebarNav: SidebarNavItem[];
};

export type DocsConfig = {
    mainNav: NavItem[]
    sidebarNav: SidebarNavItem[]
}

export type DashboardConfig = {
    mainNav: NavItem[]
    sidebarNav: SidebarNavItem[]
}


interface slug {
    url: string
    items: string
    title: string
}
