'use client';

import {useState} from "react";
import {useRouter} from "next/navigation";
import {ReactTagProps} from "@/@types";
import {Routes} from "@/utils";

import {toast} from "@/utils/hooks/useToast";
import {cn} from "@/utils/utils";
import {Icons} from "@/components/icons";
import {Button, buttonVariants} from "@/components/ui/button";

interface PostCreateButtonProps extends ReactTagProps<'button'> {
    className?: string;
}

export const PostCreateButton = ({ className, ...props }: PostCreateButtonProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleCreatePost = async () => {
        setIsLoading(true);

        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'Untitled Post'
            })
        });

        if (!response?.ok) {
            return toast({
                title: 'Something went wrong.',
                description: 'Your post was not created. Please try again.',
                variant: 'destructive'
            });
        }

        const post = await response.json();

        setIsLoading(false);

        router.push(`${Routes.EDIT}/${post.id}`);
    };

    return (
        <Button
            onClick={handleCreatePost}
            className={cn(
                buttonVariants(),
                {
                    'cursor-not-allowed opacity-60': isLoading
                },
                className
            )}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            ) : (
                <Icons.add className='mr-2 h-4 w-4' />
            )}
            New post
        </Button>
    );
};
