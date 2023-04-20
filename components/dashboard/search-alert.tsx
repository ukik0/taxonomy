'use client';

import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {ReactTagProps, slug} from "@/@types";

import {flatten, getTitlesFromPages} from "@/utils/utils";
import {Icons} from "@/components/common/icons";
import {AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader} from "@/components/ui/alert-dialog";
import {Input} from "@/components/ui/input";

interface SearchAlertProps extends ReactTagProps<'div'> {
    showDeleteAlert: boolean;
    setShowDeleteAlert: Dispatch<SetStateAction<boolean>>;
}

export const SearchAlert = ({ showDeleteAlert, setShowDeleteAlert }: SearchAlertProps) => {
    const router = useRouter();

    const [slugs, setSlugs] = useState<slug[]>([]);
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        const flattenSlugs = async () => {
            const slugs = (await getTitlesFromPages()) as unknown as slug[];

            setSlugs(flatten(slugs));
        };

        flattenSlugs();
    }, []);
    console.log(slugs);
    return (
        <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className='relative w-full'>
                        <Input
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            type='search'
                            placeholder='Type a command or search'
                        />
                        <div className='absolute right-1.5 top-2 hidden cursor-pointer select-none px-1 text-slate-500 opacity-100 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:flex'>
                            <Icons.close onClick={() => setShowDeleteAlert(false)} />
                        </div>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter className='max-h-[200px] overflow-y-auto sm:justify-start'>
                    <ul className='flex flex-col items-start gap-2'>
                        {slugs &&
                            slugs
                                .filter((slug) => slug.title.toLowerCase().includes(value.toLowerCase()))
                                .map((slug) => (
                                    <li className='text-md cursor-pointer text-slate-400 transition-colors hover:text-slate-800'>
                                        {slug.title}
                                    </li>
                                ))}
                    </ul>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
