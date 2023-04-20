import {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import hero from '@/public/images/hero.png';
import {Routes} from '@/utils';

import {cn} from '@/utils/utils';
import {AuthForm} from '@/components/auth-from';
import {Icons} from '@/components/common/icons';
import {buttonVariants} from '@/components/ui/button';

export const metadata: Metadata = {
    title: 'Create an account',
    description: 'Create an account to get started.'
};

export default async function RegisterPage() {
    return (
        <div className='container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
            <Link
                href={Routes.LOGIN}
                className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'absolute right-4 top-4 md:right-8 md:top-8'
                )}
            >
                Login
            </Link>
            <div className='flex hidden h-full w-full items-center justify-center bg-slate-200 lg:flex'>
                <Image src={hero} width={550} alt='Hero image' priority />
            </div>
            <div className='lg:p-8'>
                <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
                    <div className='flex flex-col space-y-2 text-center'>
                        <Icons.logo className='mx-auto h-6 w-6' />
                        <h1 className='text-2xl font-semibold tracking-tight'>Create an account</h1>
                        <p className='text-sm text-slate-500 dark:text-slate-400'>
                            Enter your email below to create your account
                        </p>
                    </div>
                    <AuthForm />
                    <p className='px-8 text-center text-sm text-slate-500 dark:text-slate-400'>
                        By clicking continue, you agree to our{' '}
                        <Link href={Routes.TERMS} className='hover:text-brand underline underline-offset-4'>
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href={Routes.PRIVACY} className='hover:text-brand underline underline-offset-4'>
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
