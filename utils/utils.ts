import {notFound} from "next/navigation";
import {ClassValue, clsx} from "clsx";
import {allDocuments} from "contentlayer/generated";
import {twMerge} from "tailwind-merge";

export const absoluteUrl = (path: string) => `${process.env.NEXT_PUBLIC_APP_URL}${path}`;

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatDate = (input: string | number): string => {
    const date = new Date(input);

    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
};

export const getPageFromParams = (params: { slug: string[] }) => {
    const slug = params.slug.join('/');
    const page = allDocuments.find((page) => page.slugAsParams === slug);

    if (!page) return notFound();

    return page;
};
