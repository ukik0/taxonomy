'use client';

import {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {Routes} from '@/utils';
import {Post} from '@prisma/client';

import {Icons} from '@/components/icons';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '@/components/ui/alert-dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface PostOperationsProps {
    post: Pick<Post, 'id' | 'title'>;
}

const deletePost = async (id: Post['id']) => {
    return null
}


export const PostOperations = ({ post }: PostOperationsProps) => {
    const router = useRouter();
    const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
    const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false);

    const handleDeletePost = async (event: Event) => {
        event.preventDefault();
        setIsDeleteLoading(true);

        const deleted = await deletePost(post.id);

        if (deleted) {
            setIsDeleteLoading(false);
            setShowDeleteAlert(false);
            router.refresh();
        }
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className='flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-slate-50'>
                    <Icons.ellipsis className='h-4 w-4' />
                    <span className='sr-only'>Open</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                    <DropdownMenuItem>
                        <Link href={`${Routes.EDIT}/${post.id}`} className='flex w-full'>
                            Edit
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className='flex cursor-pointer items-center text-red-600 focus:bg-red-50'
                        onSelect={() => setShowDeleteAlert(true)}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this post?</AlertDialogTitle>
                        <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeletePost}
                            className='bg-red-600 focus:ring-red-600'
                        >
                            {isDeleteLoading ? (
                                <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                            ) : (
                                <Icons.trash className='mr-2 h-4 w-4' />
                            )}
                            <span>Delete</span>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
