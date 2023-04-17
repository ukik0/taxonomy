import {redirect} from 'next/navigation';

import {authOptions} from '@/utils/auth';
import {getCurrentUser} from '@/utils/session';
import {DashboardHeader} from '@/components/dashboard-header';
import {DashboardShell} from '@/components/shell';
import {UserNameForm} from '@/components/user-name-form';

export const metadata = {
    title: 'Settings',
    description: 'Manage account and website settings.'
};

export default async function SettingsPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect(authOptions?.pages?.signIn || '/login');
    }

    return (
        <DashboardShell>
            <DashboardHeader heading='Settings' text='Manage account and website settings.' />
            <div className='grid gap-10'>
                {user.name && <UserNameForm user={{ id: user.id, name: user.name }} />}
            </div>
        </DashboardShell>
    );
}