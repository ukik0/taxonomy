import {AvatarProps} from '@radix-ui/react-avatar';
import {User} from 'next-auth';

import {Icons} from '@/components/common/icons';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

interface UserAvatarProps extends AvatarProps {
    user: Pick<User, 'name' | 'image'>;
}

export const UserAvatar = ({ user, ...props }: UserAvatarProps) => {
    return (
        <Avatar {...props}>
            {user.image ? (
                <AvatarImage alt='Picture' src={user.image} />
            ) : (
                <AvatarFallback>
                    <span className='sr-only'>{user.name}</span>
                    <Icons.user className='h-4 w-4' />
                </AvatarFallback>
            )}
        </Avatar>
    );
};
