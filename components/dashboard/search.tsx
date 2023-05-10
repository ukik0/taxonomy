'use client';

import {useState} from "react";
import {ReactTagProps} from "@/@types";

import {cn} from "@/utils/utils";
import {SearchAlert} from "@/components/dashboard/search-alert";
import {Input} from "@/components/ui/input";

interface SearchProps extends ReactTagProps<'div'> {
    className?: string;
}

export const Search = ({ className, ...props }: SearchProps) => {
    const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

    return (
        <>
            <div
                onClick={() => setShowDeleteAlert(true)}
                className={cn('relative w-full', className)}
                {...props}
            >
                <Input
                    type='search'
                    placeholder='Search documentation...'
                    className='h-8 cursor-pointer w-full sm:w-64 sm:pr-12'
                    readOnly
                />
                <kbd className='pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex'>
                    <span className='text-xs'>⌘</span>K
                </kbd>
            </div>
            <SearchAlert showDeleteAlert={showDeleteAlert} setShowDeleteAlert={setShowDeleteAlert} />
        </>
    );
};
