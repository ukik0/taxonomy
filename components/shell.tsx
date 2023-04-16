import { ReactNode } from 'react';
import { ReactTagProps } from '@/@types';

import { cn } from '@/utils/utils';

interface DashboardShallProps extends ReactTagProps<'div'> {
    className?: string;
    children: ReactNode;
}

export const DashboardShell = ({ className, children, ...props }: DashboardShallProps) => {
    return (
        <div className={cn('grid items-start gap-8', className)} {...props}>
            {children}
        </div>
    );
};
