import {notFound} from "next/navigation";
import {slug} from "@/@types";
import {ClassValue, clsx} from "clsx";
import {allDocuments} from "contentlayer/generated";
import {twMerge} from "tailwind-merge";

import {getTableOfContents} from "@/utils/toc";

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
            .map(async (page) => await getTableOfContents(page.body.raw))
            .filter(Boolean)
            .map(async (item) => {
                const Item = await item;

                if (Item.items) {
                    Item.items.map((item) => item.title);
                }

                return item;
            })
            .flat()
    );
};

export const flatten = (slugs: slug[]): any => {
    return slugs
        .reduce(
            (flat, link) =>
                flat.concat(
                    link.items as any
                    // ? flatten(link.items as unknown as slug[])
                    // : link
                ),
            []
        )
        .filter(Boolean);
};
