import {ReactNode} from 'react';
import {notFound} from 'next/navigation';

import {dashboardConfig} from '@/utils/constants/dashboard';
import {getCurrentUser} from '@/utils/session';
import {DashboardNav} from '@/components/dashboard/dashboard-nav';
import {NavMenu} from '@/components/common/layout/nav-menu';
import {UserNav} from '@/components/dashboard/user-nav';

interface DashboardLayoutProps {
    children: ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const user = await getCurrentUser();

    if (!user) return notFound();

    return (
        <div className='mx-auto flex flex-col space-y-6'>
            <header className='container sticky top-0 z-40 bg-white'>
                <div className='flex h-16 items-center justify-between border-b border-b-slate-200 py-4'>
                    <NavMenu items={dashboardConfig.mainNav} />
                    <UserNav
                        user={{
                            name: user.name,
                            image: user.image,
                            email: user.email
                        }}
                    />
                </div>
            </header>
            <div className='container grid gap-12 md:grid-cols-[200px_1fr]'>
                <aside className='hidden w-[200px] flex-col md:flex'>
                    <DashboardNav items={dashboardConfig.sidebarNav} />
                </aside>
                <main className='flex w-full flex-1 flex-col overflow-hidden'>{children}</main>
            </div>
        </div>
    );
}
