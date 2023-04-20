'use client';

import {ReactNode, useState} from "react";
import Link from "next/link";
import {useSelectedLayoutSegment} from "next/navigation";
import {NavItem} from "@/@types";
import {Routes} from "@/utils";

import {siteConfig} from "@/config/site";
import {cn} from "@/utils/utils";
import {Icons} from "@/components/common/icons";
import {MobileNavMenu} from "@/components/common/layout/mobile-nav-menu";

interface NavMenuProps {
    items?: NavItem[];
    children?: ReactNode;
}

export const NavMenu = ({ items, children }: NavMenuProps) => {
    const segment = useSelectedLayoutSegment();
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

    return (
        <div className='flex gap-6 md:gap-8'>
            <Link href={Routes.ROOT} className='flex hidden items-center md:flex'>
                <Icons.logo />
                <span className='hidden font-bold sm:inline-block'>{siteConfig.name}</span>
            </Link>
            {items?.length && (
                <nav className='hidden gap-6 md:flex'>
                    {items?.map((item) => (
                        <Link
                            key={item.title}
                            href={item.disabled ? '#' : item.href}
                            className={cn(
                                'flex items-center text-lg font-semibold text-slate-600 sm:text-sm',
                                item.href.startsWith(`/${segment}`) && 'text-slate-900',
                                item.disabled && 'cursor-not-allowed opacity-80'
                            )}
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>
            )}
            <button
                onClick={() => setShowMobileMenu((prev) => !prev)}
                className='flex items-center space-x-2 md:hidden'
            >
                {showMobileMenu ? <Icons.close /> : <Icons.logo />}
                <span className='font-bold'>Menu</span>
            </button>

            {items && showMobileMenu && <MobileNavMenu items={items}>{children}</MobileNavMenu>}
        </div>
    );
};
