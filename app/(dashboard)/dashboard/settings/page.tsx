import {redirect} from 'next/navigation';
import {Routes} from '@/utils';

import {authOptions} from '@/utils/auth';
import {getCurrentUser} from '@/utils/session';
import {DashboardHeader} from '@/components/dashboard/dashboard-header';
import {DashboardShell} from '@/components/dashboard/shell';
import {UserNameForm} from '@/components/dashboard/user-name-form';

export const metadata = {
    title: 'Settings',
    description: 'Manage account and website settings.'
};

export default async function SettingsPage() {
    const user = await getCurrentUser();

    if (!user) return redirect(authOptions?.pages?.signIn || Routes.LOGIN);

    return (
        <DashboardShell>
            <DashboardHeader heading='Settings' text='Manage account and website settings.' />
            <div className='grid gap-10'>
                {user.name && <UserNameForm user={{ id: user.id, name: user.name }} />}
            </div>
        </DashboardShell>
    );
}
