import {notFound, redirect} from "next/navigation";
import {Routes} from "@/utils";

import {authOptions} from "@/utils/auth";
import {getCurrentUser} from "@/utils/session";
import {Editor} from "@/components/post/editor";
import {postsApi} from "@/utils/api/posts";

interface EditPostPageProps {
    params: {
        postId: string;
    };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
    const user = await getCurrentUser();

    if (!user) redirect(authOptions?.pages?.signIn || Routes.LOGIN);

    const post = await postsApi.getCurrentPost(params.postId);

    if (!post) return notFound();

    return (
        <Editor
            post={{
                id: post.id,
                title: post.title,
                content: post.content,
                published: post.published
            }}
        />
    );
}
