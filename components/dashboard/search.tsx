'use client';

import {SyntheticEvent} from 'react';
import {ReactTagProps} from '@/@types';

import {toast} from '@/utils/hooks/useToast';
import {cn} from '@/utils/utils';

interface SearchProps extends ReactTagProps<'form'> {
    className?: string;
}

export const Search = ({ className, ...props }: SearchProps) => {
    const onSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        return toast({
            title: 'Wrong',
            description: 'Big Wrong'
        });
    };

    return (
        <form onSubmit={onSubmit} className={cn('relative w-full', className)} {...props}>
            <input
                type='search'
                placeholder='Search documentation...'
                className='block h-8 w-full appearance-none rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-sm placeholder:text-slate-400 focus:border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:ring-offset-1 sm:w-64 sm:pr-12'
            />
            <kbd className='pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium text-slate-600 opacity-100 sm:flex'>
                <span className='text-xs'>⌘</span>K
            </kbd>
        </form>
    );
};
