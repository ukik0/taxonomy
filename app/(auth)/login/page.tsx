import {Metadata} from 'next';
import Link from 'next/link';
import {Routes} from '@/utils';

import {cn} from '@/utils/utils';
import {AuthForm} from '@/components/common/auth-form';
import {Icons} from '@/components/common/icons';
import {buttonVariants} from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login to your account'
};

export default async function LoginPage() {
    return (
        <div className='container flex h-screen w-screen flex-col items-center justify-center'>
            <Link
                href={Routes.ROOT}
                className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'absolute left-4 top-4 md:left-8 md:top-8'
                )}
            >
                <>
                    <Icons.chevronLeft className='mr-2 h-4 w-4' />
                    Back
                </>
            </Link>
            <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                <div className='flex flex-col space-y-2 text-center'>
                    <Icons.logo className='mx-auto h-6 w-6' />
                    <h1 className='text-2xl font-semibold tracking-tight'>Welcome back</h1>
                    <p className='text-sm text-slate-500 dark:text-slate-400'>
                        Enter your email to sign in to your account
                    </p>
                </div>
                <AuthForm />
                <p className='px-8 text-center text-sm text-slate-500 dark:text-slate-400'>
                    <Link href={Routes.REGISTER} className='hover:text-brand underline underline-offset-4'>
                        Don&apos;t have an account? Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
