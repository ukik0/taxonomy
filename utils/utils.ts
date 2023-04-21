import {notFound} from 'next/navigation';
import {slug} from '@/@types';
import {ClassValue, clsx} from 'clsx';
import {allDocuments} from 'contentlayer/generated';
import {twMerge} from 'tailwind-merge';

import {getTableOfContents} from '@/utils/toc';

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

export const getTitlesFromPages = async () => {
    return await Promise.all(
        allDocuments
            .filter(
                (page) => page.title !== 'Not Implemented' && (page.type === 'Doc' || page.type === 'Guide')
            )
            .map(async (page) => ({
                title: page.type,
                url: page.url,
                content: await getTableOfContents(page.body.raw)
            }))
            .map(async (item) => {
                const Item = await item;

                return Item;
            })
    );
};

const flat = (item: slug['content']['items'][]) => item?.map((el) => el).flat();

export const flatten = (slugs: slug[]): any => {
    return slugs
        .reduce(
            (acc, el) =>
                acc.concat({
                    // @ts-ignore
                    title: el.title,
                    url: el.url,
                    items: flat(el.content?.items as unknown as slug['content']['items'][])
                }),
            []
        )
        .filter(Boolean);
};
