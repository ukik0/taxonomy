import { ReactNode } from 'react';

interface DashboardHeaderProps {
    text: string;
    children: ReactNode;
    heading: string;
}

export const DashboardHeader = ({ text, heading, children }: DashboardHeaderProps) => {
    return (
        <div className='flex justify-between px-2'>
            <div className='grid gap-1'>
                <h1 className='text-2xl font-bold tracking-wide text-slate-900'>{heading}</h1>
                {text && <p className='text-neutral-500'>{text}</p>}
            </div>
            {children}
        </div>
    );
};
