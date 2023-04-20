'use client';

import {useEffect, useMemo, useState} from 'react';

import {useMounted} from '@/utils/hooks/useMounted';
import {TableOfContents} from '@/utils/toc';
import {cn} from '@/utils/utils';

interface DashboardTableOfContentsProps {
    toc: TableOfContents;
}

export const DashboardTableOfContents = ({ toc }: DashboardTableOfContentsProps) => {
    const itemIds = useMemo(
        () =>
            toc.items
                ? toc.items
                      .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
                      .flat()
                      .filter(Boolean)
                      .map((id) => id?.split('#')[1])
                : [],
        [toc]
    );

    const activeHeading = useActiveItem(itemIds);
    const mounted = useMounted();

    if (!toc?.items || !mounted) {
        return null;
    }

    return (
        <div className='space-y-2'>
            <p className='font-medium'>On This Page</p>
            <Tree tree={toc} activeItem={activeHeading} />
        </div>
    );
};

const useActiveItem = (itemIds: (string | undefined)[]) => {
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: `0% 0% -80% 0%` }
        );

        itemIds?.forEach((id) => {
            if (!id) {
                return;
            }

            const element = document.getElementById(id);

            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            itemIds?.forEach((id) => {
                if (!id) {
                    return;
                }

                const element = document.getElementById(id);

                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [itemIds]);

    return activeId;
};

interface TreeProps {
    tree: TableOfContents;
    level?: number;
    activeItem?: string | null;
}

const Tree = ({ tree, activeItem, level }: TreeProps) => {
    if ((!tree.items?.length && level! >= 3) || !tree.items) return null;

    return (
        <ul className={cn('m-0 list-none', { 'pl-4': level !== 1 })}>
            {tree.items.map((item) => (
                <li key={item.title} className={cn('mt-0 pt-2')}>
                    <a
                        href={item.url}
                        className={cn(
                            'inline-block no-underline',
                            item.url === `#${activeItem}`
                                ? 'text-state-900 font-medium'
                                : 'text-sm text-slate-600 hover:text-slate-900'
                        )}
                    >
                        {item.title}
                    </a>

                    {item.items && <Tree tree={item} level={level! + 1} activeItem={activeItem} />}
                </li>
            ))}
        </ul>
    );
};
