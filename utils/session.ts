import { getServerSession } from 'next-auth';

import { authOptions } from '@/utils/auth';

export const getSession = async () => {
    return await getServerSession(authOptions);
};

export const getCurrentUser = async () => {
    const session = await getSession();

    return session?.user;
};
