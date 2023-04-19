import Link from 'next/link';
import {Doc} from 'contentlayer/generated';

import {docsConfig} from '@/config/docs';
import {Icons} from '@/components/icons';

interface DocsPagerProps {
    doc: Doc;
}

interface Item {
    href: string;
    title: string;
}

// @ts-ignore
export function flatten(links: { items? }[]) {
    // return links.reduce((flat, link) => flat.concat(link.items ? flatten(link.items) : link), []);
    return links.reduce((acc, el) => acc.concat(el.items), []);
}

function getPagerForDoc(doc: Doc) {
    const flattenedLinks = [null, ...flatten(docsConfig.sidebarNav), null] as unknown as Item[]
    const activeIndex = flattenedLinks.findIndex((link) => doc.slug === link?.href);

    const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null;
    const next = activeIndex !== flattenedLinks.length - 1 ? flattenedLinks[activeIndex + 1] : null;

    return {
        prev,
        next
    };
}

export const DocsPager = ({ doc }: DocsPagerProps) => {
    const pager = getPagerForDoc(doc);

    if (!pager) return null;

    return (
        <div className='flex flex-row items-center justify-between'>
            {pager?.prev && (
                <Link
                    href={pager.prev.href}
                    className='inline-flex items-center justify-center rounded-lg border border-transparent bg-transparent px-3 py-2 text-center text-sm  font-medium text-slate-900 hover:border-slate-200 hover:bg-slate-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-slate-200'
                >
                    <Icons.chevronLeft className='mr-2 h-4 w-4' />
                    {pager.prev.title}
                </Link>
            )}
            {pager?.next && (
                <Link
                    href={pager.next.href}
                    className='ml-auto inline-flex items-center justify-center rounded-lg border border-transparent bg-transparent px-3 py-2 text-center text-sm  font-medium text-slate-900 hover:border-slate-200 hover:bg-slate-100 focus:z-10 focus:outline-none focus:ring-4 focus:ring-slate-200'
                >
                    {pager.next.title}
                    <Icons.chevronRight className='ml-2 h-4 w-4' />
                </Link>
            )}
        </div>
    );
};
