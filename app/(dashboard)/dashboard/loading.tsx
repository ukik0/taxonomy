import {DashboardHeader} from '@/components/dashboard/dashboard-header';
import {PostCreateButton} from '@/components/post/post-create-button';
import {PostItem} from '@/components/post/post-item';
import {DashboardShell} from '@/components/dashboard/shell';

export default function DashboardLoading() {
    return (
        <DashboardShell>
            <DashboardHeader heading='Posts' text='Create and manage posts.'>
                <PostCreateButton />
            </DashboardHeader>
            <div className='divide-y divide-neutral-200 rounded-md border border-slate-200'>
                <PostItem.Skeleton />
                <PostItem.Skeleton />
                <PostItem.Skeleton />
                <PostItem.Skeleton />
                <PostItem.Skeleton />
            </div>
        </DashboardShell>
    );
}
