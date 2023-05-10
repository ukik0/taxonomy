import {ReactTagProps} from "@/@types";

import {cn} from "@/utils/utils";

interface SkeletonProps extends ReactTagProps<'div'> {
    className: string;
}

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
    return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />;
};
