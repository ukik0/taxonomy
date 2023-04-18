'use client';

import {useCallback, useEffect, useRef, useState} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {postPatchSchema, Routes} from "@/utils";
import EditorJS from "@editorjs/editorjs";
import {zodResolver} from "@hookform/resolvers/zod";
import {Post} from "@prisma/client";
import {useForm} from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import {z} from "zod";

import {toast} from "@/utils/hooks/useToast";
import {cn} from "@/utils/utils";
import {Icons} from "@/components/icons";
import {buttonVariants} from "@/components/ui/button";

interface EditorProps {
    post: Pick<Post, 'id' | 'title' | 'content' | 'published'>;
}

type FormData = z.infer<typeof postPatchSchema>;

export const Editor = ({ post }: EditorProps) => {
    const { register, handleSubmit } = useForm<FormData>({
        resolver: zodResolver(postPatchSchema)
    });

    const ref = useRef<EditorJS>();
    const router = useRouter();
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [isMounted, setIsMounted] = useState<boolean>(false);

    const initializeEditor = useCallback(async () => {
        const EditorJS = (await import('@editorjs/editorjs')).default;
        const Header = (await import('@editorjs/header')).default;
        const Embed = (await import('@editorjs/embed')).default;
        const Table = (await import('@editorjs/table')).default;
        const List = (await import('@editorjs/list')).default;
        const Code = (await import('@editorjs/code')).default;
        const LinkTool = (await import('@editorjs/link')).default;
        const InlineCode = (await import('@editorjs/inline-code')).default;

        const body = postPatchSchema.parse(post);

        if (!ref.current) {
            const editor = new EditorJS({
                holder: 'editor',
                onReady() {
                    ref.current = editor;
                },
                placeholder: 'Type here to write your post...',
                inlineToolbar: true,
                data: body.content,
                tools: {
                    header: Header,
                    linkTool: LinkTool,
                    list: List,
                    code: Code,
                    inlineCode: InlineCode,
                    table: Table,
                    embed: Embed
                }
            });
        }
    }, [post]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMounted(true);
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            initializeEditor();

            return () => {
                ref.current?.destroy();
                ref.current = undefined;
            };
        }
    }, [isMounted, initializeEditor]);

    const onSubmit = async (data: FormData) => {
        setIsSaving(true);

        const content = await ref.current?.save();

        const response = await fetch(`/api/posts/${post.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: data.title,
                content
            })
        });

        setIsSaving(false);

        if (!response?.ok) {
            return toast({
                title: 'Something went wrong.',
                description: 'Your post was not saved. Please try again.',
                variant: 'destructive'
            });
        }

        router.refresh();

        return toast({
            description: 'Your post has been saved.'
        });
    };

    if (!isMounted) {
        return null;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid w-full gap-10'>
                <div className='flex w-full items-center justify-between'>
                    <div className='flex items-center space-x-10'>
                        <Link href={Routes.DASHBOARD} className={cn(buttonVariants({ variant: 'ghost' }))}>
                            <>
                                <Icons.chevronLeft className='mr-2 h-4 w-4' />
                                Back
                            </>
                        </Link>
                        <p className='text-sm text-slate-600'>{post.published ? 'Published' : 'Draft'}</p>
                    </div>
                    <button type='submit' className={cn(buttonVariants())}>
                        {isSaving && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
                        <span>Save</span>
                    </button>
                </div>
                <div className='prose prose-stone mx-auto w-[800px]'>
                    <TextareaAutosize
                        autoFocus
                        id='title'
                        defaultValue={post.title}
                        placeholder='Post title'
                        className='w-full resize-none appearance-none overflow-hidden text-5xl font-bold focus:outline-none'
                        {...register('title')}
                    />
                    <div id='editor' className='min-h-[500px]' />
                    <p className='text-sm text-gray-500'>
                        Use <kbd className='rounded-md border bg-slate-50 px-1 text-xs uppercase'>Tab</kbd> to
                        open the command menu.
                    </p>
                </div>
            </div>
        </form>
    );
};
