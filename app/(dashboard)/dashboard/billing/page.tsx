import Link from "next/link";
import {redirect} from "next/navigation";

import {authOptions} from "@/utils/auth";
import {getCurrentUser} from "@/utils/session";
import {cn} from "@/utils/utils";
import {DashboardHeader} from "@/components/dashboard-header";
import {DashboardShell} from "@/components/shell";
import {buttonVariants} from "@/components/ui/button";
import {Card} from "@/components/ui/card";

export const metadata = {
    title: 'Billing',
    description: 'Manage billing and your subscription plan.'
};

export default async function BillingPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect(authOptions?.pages?.signIn || '/login');
    }

    return (
        <DashboardShell>
            <DashboardHeader heading='Billing' text='Manage billing and your subscription plan.' />
            <div className='grid gap-10'>
                {/*<BillingForm*/}
                {/*    subscriptionPlan={{*/}
                {/*        ...subscriptionPlan,*/}
                {/*        isCanceled*/}
                {/*    }}*/}
                {/*/>*/}
                <Card>
                    <Card.Header>
                        <Card.Title>Note</Card.Title>
                    </Card.Header>
                    <Card.Content className='space-y-4 pb-6 text-sm'>
                        <p>
                            Taxonomy app is a demo app using a Stripe test environment.{' '}
                            <strong>You can test the upgrade and won&apos;t be charged.</strong>
                        </p>
                        <p>
                            You can find a list of test card numbers on the{' '}
                            <Link
                                href='https://stripe.com/docs/testing#cards'
                                target='_blank'
                                rel='noreferrer'
                                className={cn(buttonVariants({ variant: 'link', size: 'sm' }))}
                            >
                                Stripe docs
                            </Link>
                            .
                        </p>
                    </Card.Content>
                </Card>
            </div>
        </DashboardShell>
    );
}
