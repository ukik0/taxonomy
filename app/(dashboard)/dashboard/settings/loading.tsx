import {DashboardHeader} from "@/components/dashboard/dashboard-header";
import {DashboardShell} from "@/components/dashboard/shell";
import {Card} from "@/components/ui/card";

export default function DashboardSettingsLoading() {
    return (
        <DashboardShell>
            <DashboardHeader heading='Settings' text='Manage account and website settings.' />
            <div className='grid gap-10'>
                <Card.Skeleton />
            </div>
        </DashboardShell>
    );
}
