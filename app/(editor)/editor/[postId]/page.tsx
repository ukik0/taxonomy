import {notFound, redirect} from "next/navigation";
import {Routes} from "@/utils";
import {Post} from "@prisma/client";

import {authOptions} from "@/utils/auth";
import {db} from "@/utils/db";
import {getCurrentUser} from "@/utils/session";
import {Editor} from "@/components/editor";

interface EditPostPageProps {
    params: {
        postId: string;
    };
}

async function getCurrentPost(postId: Post['id']) {
    return db.post.findUnique({
        where: {
            id: postId
        }
    });
}

export default async function EditPostPage({ params }: EditPostPageProps) {
    const user = await getCurrentUser();

    if (!user) redirect(authOptions?.pages?.signIn || Routes.LOGIN);

    const post = await getCurrentPost(params.postId);

    if (!post) {
        notFound();
    }

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
