import {ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

export const absoluteUrl = (path: string) => `${process.env.NEXT_PUBLIC_APP_URL}${path}`;

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export function formatDate(input: string | number): string {
    const date = new Date(input);

    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}
