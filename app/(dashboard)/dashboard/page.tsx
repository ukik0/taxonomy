import {cache} from 'react';
import {Metadata} from 'next';
import {redirect} from 'next/navigation';
import {Routes} from '@/utils';
import {User} from '@prisma/client';

import {authOptions} from '@/utils/auth';
import {db} from '@/utils/db';
import {getCurrentUser} from '@/utils/session';
import {cn} from '@/utils/utils';
import {EmptyPlaceholder} from '@/components/EmptyPlaceholdre';
import {DashboardHeader} from '@/components/dashboard-header';
import {PostCreateButton} from '@/components/post-create-button';
import {PostItem} from '@/components/post-item';
import {DashboardShell} from '@/components/shell';
import {buttonVariants} from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Dashboard page'
};

const getUserPosts = cache(async (id: User['id']) => {
    const posts = await db.post.findMany({
        where: { authorId: id },
        select: { id: true, title: true, published: true, createdAt: true },
        orderBy: { updatedAt: 'desc' }
    });

    return posts;
});

export default async function DashboardPage() {
    const user = await getCurrentUser();

    if (!user) return redirect(authOptions?.pages?.signIn || Routes.LOGIN);

    const posts = await getUserPosts(user.id);

    return (
        <DashboardShell>
            <DashboardHeader text={'Create and manage posts.'} heading={'Posts'}>
                <PostCreateButton />
            </DashboardHeader>

            <div>
                {posts?.length ? (
                    <div className='divide-y divide-neutral-200 rounded-md border border-slate-200'>
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
                        <PostCreateButton
                            className={cn(buttonVariants({ variant: 'outline' }), 'text-slate-900')}
                        />
                    </EmptyPlaceholder>
                )}
            </div>
        </DashboardShell>
    );
}
