'use client';

import {useState} from "react";
import {ReactTagProps} from "@/@types";

import {cn} from "@/utils/utils";
import {SearchAlert} from "@/components/dashboard/search-alert";
import {Button, buttonVariants} from "@/components/ui/button";

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
                <Button
                    className={buttonVariants({
                        size: 'sm',
                        variant: 'outline',
                        className: 'w-[280px] text-slate-500'
                    })}
                >
                    Search documentation...
                </Button>
                <kbd className='pointer-events-none absolute right-1.5 top-[50%] hidden h-5 -translate-y-[50%] select-none items-center gap-1 rounded border bg-white px-1.5 font-mono text-[10px] font-medium text-slate-600 opacity-100 sm:flex'>
                    <span className='text-xs'>⌘</span>K
                </kbd>
            </div>
            <SearchAlert showDeleteAlert={showDeleteAlert} setShowDeleteAlert={setShowDeleteAlert} />
        </>
    );
};
