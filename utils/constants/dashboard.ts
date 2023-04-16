import { DashboardConfig } from '@/@types';
import { Routes } from '@/utils';

export const dashboardConfig: DashboardConfig = {
    mainNav: [
        {
            title: 'Documentation',
            href: Routes.DOCUMENTATION
        },
        {
            title: 'Support',
            href: Routes.SUPPORT,
            disabled: true
        }
    ],
    sidebarNav: [
        {
            title: 'Posts',
            href: Routes.DASHBOARD,
            icon: 'post'
        },
        {
            title: 'Billing',
            href: `${Routes.DASHBOARD}/${Routes.BILLING}`,
            icon: 'billing'
        },
        {
            title: 'Settings',
            href: `${Routes.DASHBOARD}/${Routes.SETTINGS}`,
            icon: 'settings'
        }
    ]
};
