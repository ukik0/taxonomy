import { ReactNode } from 'react';

import { cn } from '@/utils/utils';

interface CalloutProps {
    children: ReactNode;
    icon: string;
    type: 'default' | 'danger' | 'warning';
}

export const Callout = ({ children, type, icon, ...props }: CalloutProps) => {
    return (
        <div
            className={cn('my-6 flex items-start rounded-md border border-l-4 p-4', {
                'border-slate-900 bg-slate-50': type === 'default',
                'border-red-900 bg-red-50': type === 'danger',
                'border-yellow-900 bg-yellow-50': type === 'warning'
            })}
            {...props}
        >
            {icon && <span className='mr-4 text-2xl'>{icon}</span>}
            <div>{children}</div>
        </div>
    );
};
