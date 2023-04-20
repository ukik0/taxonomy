'use client';

import Link from 'next/link';
import {ReactTagProps} from '@/@types';
import {Routes} from '@/utils';
import {User} from 'next-auth';
import {signOut} from 'next-auth/react';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {UserAvatar} from '@/components/dashboard/user-avatar';

interface UserNavProps extends ReactTagProps<'div'> {
    user: Pick<User, 'name' | 'image' | 'email'>;
}

export const UserNav = ({ user }: UserNavProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <UserAvatar user={{ name: user.name, image: user.image }} className='h-8 w-8' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
                <div className='flex items-center justify-start gap-2 p-2'>
                    <div className='flex flex-col space-y-1 leading-none'>
                        {user.name && <p className='font-medium'>{user.name}</p>}
                        {user.email && (
                            <p className='w-[200px] truncate text-sm text-slate-600'>{user.email}</p>
                        )}
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={Routes.DASHBOARD}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`${Routes.DASHBOARD}/${Routes.BILLING}`}>Billing</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`${Routes.DASHBOARD}/${Routes.SETTINGS}`}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className='cursor-pointer'
                    onSelect={(event: Event) => {
                        event.preventDefault();
                        signOut({
                            callbackUrl: `${window.location.origin}/login`
                        });
                    }}
                >
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
