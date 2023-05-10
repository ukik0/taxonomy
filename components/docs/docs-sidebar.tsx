'use client';

import Link from "next/link";
import {usePathname} from "next/navigation";
import {SidebarNavItem} from "@/@types";

import {cn} from "@/utils/utils";

interface DocsSidebarProps {
    items: SidebarNavItem[];
}
export const DocsSidebar = ({ items }: DocsSidebarProps) => {
    const pathname = usePathname();

    if (!items) return null;

    return (
        <div className='w-full'>
            {items.map((item, index) => (
                <div key={index} className={cn('pb-8')}>
                    <h4 className='mb-1 rounded-md px-2 py-1 text-sm font-medium'>{item.title}</h4>
                    {item.items ? <DocsSidebarItems items={item.items} pathname={pathname} /> : null}
                </div>
            ))}
        </div>
    );
};

interface DocsSidebarItemsProps {
    items: SidebarNavItem[];
    pathname: string | null;
}

export const DocsSidebarItems = ({ items, pathname }: DocsSidebarItemsProps) => {
    if (!items) return null;

    return (
        <div className='grid grid-flow-row auto-rows-max text-sm'>
            {items.map((item, index) =>
                !item.disabled && item.href ? (
                    <Link
                        key={index}
                        href={item.href}
                        className={cn('flex w-full items-center rounded-md p-2 hover:underline', {
                            'bg-muted': pathname === item.href
                        })}
                        target={item.external ? '_blank' : ''}
                        rel={item.external ? 'noreferrer' : ''}
                    >
                        {item.title}
                    </Link>
                ) : (
                    <span className='flex w-full cursor-not-allowed items-center rounded-md p-2 opacity-60'>
                        {item.title}
                    </span>
                )
            )}
        </div>
    );
};
