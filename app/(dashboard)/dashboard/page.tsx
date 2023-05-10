import {cache} from "react";
import {Metadata} from "next";
import {redirect} from "next/navigation";
import {Routes} from "@/utils";
import {User} from "@prisma/client";

import {postsApi} from "@/utils/api/posts";
import {authOptions} from "@/utils/auth";
import {getCurrentUser} from "@/utils/session";
import {DashboardHeader} from "@/components/dashboard/dashboard-header";
import {DashboardShell} from "@/components/dashboard/shell";
import {EmptyPlaceholder} from "@/components/post/empty-placeholdre";
import {PostCreateButton} from "@/components/post/post-create-button";
import {PostItem} from "@/components/post/post-item";

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Dashboard page'
};

const getUserPosts = cache(async (id: User['id']) => await postsApi.getUserPosts(id));

export default async function DashboardPage() {
    const user = await getCurrentUser();

    if (!user) return redirect(authOptions?.pages?.signIn || Routes.LOGIN);

    const posts = await getUserPosts(user.id);

    return (
        <DashboardShell>
            <DashboardHeader heading='Posts' text='Create and manage posts.'>
                <PostCreateButton />
            </DashboardHeader>
            <div>
                {posts?.length ? (
                    <div className='divide-y divide-border rounded-md border'>
                        {posts.map((post) => (
                            <PostItem key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <EmptyPlaceholder>
                        <EmptyPlaceholder.Icon name='post' />
                        <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
                        <EmptyPlaceholder.Description>
                            You don&apos;t have any posts yet. Start creating content.
                        </EmptyPlaceholder.Description>
                        <PostCreateButton/>
                    </EmptyPlaceholder>
                )}
            </div>
        </DashboardShell>
    );
}
