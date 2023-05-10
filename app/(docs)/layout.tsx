import {ReactNode} from "react";
import Link from "next/link";

import {docsConfig} from "@/config/docs";
import {siteConfig} from "@/config/site";
import {Icons} from "@/components/common/icons";
import {Footer} from "@/components/common/layout/footer";
import {NavMenu} from "@/components/common/layout/nav-menu";
import {Search} from "@/components/dashboard/search";
import {DocsSidebar} from "@/components/docs/docs-sidebar";

interface DocsLayoutProps {
    children: ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
    return (
        <div className='flex min-h-screen flex-col'>
            <header className='sticky top-0 z-40 w-full border-b bg-background'>
                <div className='container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0'>
                    <NavMenu items={docsConfig.mainNav}>
                        <DocsSidebar items={docsConfig.sidebarNav} />
                    </NavMenu>
                    <div className='flex flex-1 items-center space-x-4 sm:justify-end'>
                        <div className='flex-1 sm:grow-0'>
                            <Search />
                        </div>
                        <nav className='flex space-x-4'>
                            <Link href={siteConfig.links.github} target='_blank' rel='noreferrer'>
                                <Icons.gitHub className='h-7 w-7' />
                                <span className='sr-only'>GitHub</span>
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>
            <div className='container flex-1'>{children}</div>
            <Footer className='border-t' />
        </div>
    );
}
