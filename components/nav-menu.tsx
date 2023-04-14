'use client';

import {ReactNode, useState} from 'react';
import Link from 'next/link';
import {useSelectedLayoutSegment} from 'next/navigation';
import {Routes} from '@/utils';
import {cn} from '@/utils/utils';

import {siteConfig} from '@/config/site';
import {Icons} from '@/components/icons';

interface NavMenuProps {
    items?: NavItem[];
    children?: ReactNode;
}

export const NavMenu = ({ items, children }: NavMenuProps) => {
    const segment = useSelectedLayoutSegment();
    const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);

    return (
        <div className='flex gap-6 md:gap-10'>
            <Link href={Routes.ROOT} className='flex items-center gap-2'>
                <Icons.logo />
                <span className='hidden font-bold sm:inline-block'>{siteConfig.name}</span>
            </Link>
            {items?.length
                ? items.map((item) => (
                      <Link
                          key={item.title}
                          href={item.disabled ? '#' : item.href}
                          className={cn(
                              'flex items-center text-lg font-semibold text-slate-600 sm:text-sm hover:text-slate-950',
                              item.href.startsWith(`/${segment}`) && 'text-slate-900',
                              item.disabled && 'cursor-not-allowed opacity-80'
                          )}
                      >
                          {item.title}
                      </Link>
                  ))
                : null}
            <button
                onClick={() => setShowMobileMenu((prev) => prev)}
                className='flex items-center space-x-2 md:hidden'
            >
                <span className='font-bold'>Menu</span>
            </button>
        </div>
    );
};
