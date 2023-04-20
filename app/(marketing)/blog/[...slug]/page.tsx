import {Metadata} from "next";
import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {Routes} from "@/utils";
import {allAuthors, allPosts} from "contentlayer/generated";

import {siteConfig} from "@/config/site";
import {absoluteUrl, formatDate} from "@/utils/utils";
import {Icons} from "@/components/common/icons";
import {Mdx} from "@/components/common/mdx";

interface SlugPageProps {
    params: {
        slug: string[];
    };
}

async function getPageFromParams(params: { slug: string[] }) {
    const slug = params.slug.join('/');
    const page = await allPosts.find((post) => post.slugAsParams === slug);

    if (!page) return notFound();

    return page;
}

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
    const page = await getPageFromParams(params);

    if (!page) {
        return {};
    }

    const url = process.env.NEXT_PUBLIC_APP_URL;

    const ogUrl = new URL(`${url}/api/og`);
    ogUrl.searchParams.set('heading', page.title);
    ogUrl.searchParams.set('type', siteConfig.name);
    ogUrl.searchParams.set('mode', 'light');

    return {
        title: page.title,
        description: page.description,
        openGraph: {
            title: page.title,
            description: page.description,
            type: 'article',
            url: absoluteUrl(page.slug),
            images: [
                {
                    url: ogUrl.toString(),
                    width: 1200,
                    height: 630,
                    alt: page.title
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: page.title,
            description: page.description,
            images: [ogUrl.toString()]
        }
    };
}

export async function generateStaticParams(): Promise<SlugPageProps['params'][]> {
    return allPosts.map((page) => ({
        slug: page.slugAsParams.split('/')
    }));
}

export default async function SlugPage({ params }: SlugPageProps) {
    const page = await getPageFromParams(params);

    const authors = page.authors.map((author) =>
        allAuthors.find(({ slug }) => slug === `/authors/${author}`)
    );

    return (
        <article className='container relative max-w-3xl py-6 lg:py-10'>
            <Link
                href={Routes.BLOG}
                className='absolute left-[-200px] top-14 hidden items-center justify-center text-sm font-medium text-slate-600 hover:text-slate-900 xl:inline-flex'
            >
                <Icons.chevronLeft className='mr-2 h-4 w-4' />
                See all posts
            </Link>
            <div>
                {page.date && (
                    <time dateTime={page.date} className='block text-sm text-slate-600'>
                        Published on {formatDate(page.date)}
                    </time>
                )}
                <h1 className='mt-2 inline-block text-4xl font-extrabold leading-tight text-slate-900 lg:text-5xl'>
                    {page.title}
                </h1>
                {authors?.length && (
                    <div className='mt-4 flex space-x-4'>
                        {authors.map(
                            (author) =>
                                author && (
                                    <Link
                                        key={author._id}
                                        href={`https://twitter.com/${author.twitter}`}
                                        className='flex items-center space-x-2 text-sm'
                                    >
                                        <Image
                                            src={author.avatar}
                                            alt={author.title}
                                            width={42}
                                            height={42}
                                            className='rounded-full'
                                        />
                                        <div className='flex-1 text-left leading-tight'>
                                            <p className='font-medium text-slate-900'>{author.title}</p>
                                            <p className='text-[12px] text-slate-600'>@{author.twitter}</p>
                                        </div>
                                    </Link>
                                )
                        )}
                    </div>
                )}
            </div>
            {page.image && (
                <Image
                    src={page.image}
                    alt={page.title}
                    width={720}
                    height={405}
                    className='my-8 rounded-md border border-slate-200 bg-slate-200 transition-colors group-hover:border-slate-900'
                    priority
                />
            )}
            <Mdx code={page.body.code} />
            <hr className='my-4 border-slate-200' />
            <div className='flex justify-center py-6 lg:py-10'>
                <Link
                    href={Routes.BLOG}
                    className='inline-flex items-center justify-center text-sm font-medium text-slate-600 hover:text-slate-900'
                >
                    <Icons.chevronLeft className='mr-2 h-4 w-4' />
                    See all posts
                </Link>
            </div>
        </article>
    );
}
