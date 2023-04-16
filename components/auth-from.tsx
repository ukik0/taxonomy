'use client';

import {useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {userAuthSchema} from '@/utils';
import {cn} from '@/utils/utils';
import {zodResolver} from '@hookform/resolvers/zod';
import {signIn} from 'next-auth/react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

import {Icons} from '@/components/icons';
import {Button, buttonVariants} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {toast} from "@/utils/hooks/useToast";

interface AuthFormProps extends ReactTagProps<'div'> {}

type AuthData = z.infer<typeof userAuthSchema>;
export const AuthForm = ({ className, ...props }: AuthFormProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false);

    const searchParams = useSearchParams();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid }
    } = useForm<AuthData>({
        resolver: zodResolver(userAuthSchema)
    });

    const onSubmit = async (data: AuthData) => {
        setIsLoading(true);

        const signInResult = await signIn('email', {
            email: data.email.toLowerCase(),
            redirect: false,
            callbackUrl: searchParams?.get('from') || '/dashboard'
        });

        setIsLoading(false)

        if (!signInResult?.ok) {
            return toast({
                title: "Something went wrong.",
                description: "Your sign in request failed. Please try again.",
                variant: "destructive",
            })
        }

        return toast({
            title: "Check your email",
            description: "We sent you a login link. Be sure to check your spam too.",
        })
    };

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid gap-2'>
                    <div className='grid gap-1'>
                        <Label className='sr-only' htmlFor='email'>
                            Email
                        </Label>
                        <Input
                            id='email'
                            placeholder='name@example.com'
                            type='email'
                            autoCapitalize='none'
                            autoComplete='email'
                            autoCorrect='off'
                            disabled={isLoading || isGitHubLoading}
                            {...register('email')}
                        />
                        {errors?.email && <p className='px-1 text-xs text-red-600'>{errors.email.message}</p>}
                    </div>
                    <Button className={cn(buttonVariants())} disabled={isLoading || !isValid}>
                        {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
                        Sign In with Email
                    </Button>
                </div>
            </form>
            <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                    <span className='w-full border-t border-slate-300' />
                </div>
                <div className='relative flex justify-center text-xs uppercase'>
                    <span className='bg-white px-2 text-slate-600'>Or continue with</span>
                </div>
            </div>
            <Button
                className={cn(buttonVariants({ variant: 'outline' }), 'text-slate-800')}
                onClick={() => {
                    setIsGitHubLoading(true);
                    signIn('github');
                }}
                disabled={isLoading || isGitHubLoading}
            >
                {isGitHubLoading ? (
                    <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                    <Icons.gitHub className='mr-2 h-4 w-4' />
                )}
                Github
            </Button>
        </div>
    );
};
