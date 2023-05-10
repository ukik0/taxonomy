import {ReactNode} from "react";
import Link from "next/link";
import {Routes} from "@/utils";

import {NavigationMenu} from "@/utils/constants/nav-menu";
import {cn} from "@/utils/utils";
import {Footer} from "@/components/common/layout/footer";
import {NavMenu} from "@/components/common/layout/nav-menu";
import {buttonVariants} from "@/components/ui/button";

interface MarketingLayoutProps {
    children: ReactNode;
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
    return (
        <div className='flex min-h-screen flex-col'>
            <header className='container sticky top-0 z-40 bg-background'>
                <div className='flex h-20 items-center justify-between py-6'>
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
