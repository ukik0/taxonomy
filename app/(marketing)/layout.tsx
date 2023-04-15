import {ReactNode} from 'react';
import Link from 'next/link';
import {Routes} from '@/utils';
import {NavigationMenu} from '@/utils/constants/nav-menu';
import {cn} from '@/utils/utils';

import {Footer} from '@/components/footer';
import {NavMenu} from '@/components/nav-menu';
import {buttonVariants} from '@/components/ui/button';

interface MarketingLayoutProps {
    children: ReactNode;
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
    return (
        <div className='flex h-screen flex-col items-center'>
            <header className='container sticky top-0 z-40 bg-white'>
                <div className='flex h-16 items-center justify-between border-b border-b-slate-200 py-4'>
                    <NavMenu items={NavigationMenu} />
                    <nav>
                        <Link href={Routes.LOGIN} className={cn(buttonVariants({ size: 'sm' }), 'px-4')}>
                            Login
                        </Link>
                    </nav>
                </div>
            </header>
            <main className='flex-1'>{children}</main>
            <Footer />
        </div>
    );
}
