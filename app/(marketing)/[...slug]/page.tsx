import {Metadata} from "next";
import {allPages} from "contentlayer/generated";

import {siteConfig} from "@/config/site";
import {absoluteUrl, getPageFromParams} from "@/utils/utils";
import {Mdx} from "@/components/common/mdx";

interface SlugPageProps {
    params: {
        slug: string[];
    };
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
    return allPages.map((page) => ({
        slug: page.slugAsParams.split('/')
    }));
}

export default async function ({ params }: SlugPageProps) {
    const page = await getPageFromParams(params);

    return (
        <article className='container max-w-3xl py-6 lg:py-10'>
            <div className='space-y-4'>
                <h1 className='inline-block text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl'>
                    {page.title}
                </h1>
                {page.description && <p className='text-xl text-slate-600'>{page.description}</p>}
            </div>

            <hr className='my-4 border-slate-200' />

            <Mdx code={page.body.code} />
        </article>
    );
}
