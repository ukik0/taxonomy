import Link from 'next/link';

import { cn } from '@/utils/utils';

interface CardProps extends ReactTagProps<'div'> {
    href: string;
    disabled: boolean;
}

export const Card = ({ href, className, children, disabled, ...props }: CardProps) => {
    return (
        <div
            className={cn(
                'group relative rounded-lg border border-slate-200 bg-white p-6 shadow-md transition-shadow hover:shadow-lg',
                disabled && 'cursor-not-allowed opacity-60',
                className
            )}
            {...props}
        >
            <div className='flex flex-col justify-between space-y-4'>
                <div className='space-y-2 [&>h3]:!mt-0 [&>h4]:!mt-0 [&>p]:text-slate-600'>{children}</div>
            </div>
            {href && (
                <Link href={disabled ? '#' : href} className='absolute inset-0'>
                    <span className='sr-only'>View</span>
                </Link>
            )}
        </div>
    );
};
