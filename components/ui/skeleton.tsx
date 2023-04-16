import { ReactTagProps } from '@/@types';

import { cn } from '@/utils/utils';

interface SkeletonProps extends ReactTagProps<'div'> {
    className: string;
}

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
    return <div className={cn('h-5 w-2/5 animate-pulse rounded-lg bg-slate-100', className)} {...props} />;
};
