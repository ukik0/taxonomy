'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {userNameSchema} from '@/utils';
import {zodResolver} from '@hookform/resolvers/zod';
import {User} from 'next-auth';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

import {cn} from '@/utils/utils';
import {Icons} from '@/components/icons';
import {buttonVariants} from '@/components/ui/button';
import {Card} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {ReactTagProps} from '../@types';
import {toast} from "@/utils/hooks/useToast";

interface UserNameFormProps extends ReactTagProps<'form'> {
    user: Pick<User, 'id' | 'name'>;
    className?: string;
}

type UserData = z.infer<typeof userNameSchema>;

export const UserNameForm = ({ user, className, ...props }: UserNameFormProps) => {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const {
        handleSubmit,
        register,
        formState: { errors }
    } = useForm<UserData>({
        resolver: zodResolver(userNameSchema),
        defaultValues: {
            name: user?.name || ''
        }
    });

    const onSubmit = async (data: UserData) => {
        setIsSaving(true);

        const response = await fetch(`/api/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name
            })
        });

        setIsSaving(false);

        if (!response?.ok) {
            return toast({
                title: 'Something went wrong.',
                description: 'Your name was not updated. Please try again.',
                variant: 'destructive'
            });
        }

        toast({
            description: 'Your name has been updated.'
        });

        router.refresh();
    };

    return (
        <form className={cn(className)} onSubmit={handleSubmit(onSubmit)} {...props}>
            <Card>
                <Card.Header>
                    <Card.Title>Your Name</Card.Title>
                    <Card.Description>
                        Please enter your full name or a display name you are comfortable with.
                    </Card.Description>
                </Card.Header>
                <Card.Content>
                    <div className='grid gap-1'>
                        <Label className='sr-only' htmlFor='name'>
                            Name
                        </Label>
                        <Input id='name' className='w-[400px]' size={32} {...register('name')} />
                        {errors?.name && <p className='px-1 text-xs text-red-600'>{errors.name.message}</p>}
                    </div>
                </Card.Content>
                <Card.Footer>
                    <button type='submit' className={cn(buttonVariants(), className)} disabled={isSaving}>
                        {isSaving && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
                        <span>Save</span>
                    </button>
                </Card.Footer>
            </Card>
        </form>
    );
};
