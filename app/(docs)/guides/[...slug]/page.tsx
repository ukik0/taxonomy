import {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {Routes} from "@/utils";
import {allGuides} from "contentlayer/generated";

import {siteConfig} from "@/config/site";
import {getTableOfContents} from "@/utils/toc";
import {absoluteUrl, cn} from "@/utils/utils";
import {Icons} from "@/components/common/icons";
import {Mdx} from "@/components/common/mdx";
import {DashboardTableOfContents} from "@/components/common/toc";
import {DocsHeader} from "@/components/docs/docs-header";
import {buttonVariants} from "@/components/ui/button";

interface GuidePageProps {
    params: {
        slug: string[];
    };
}

async function getGuideFromParams(params: { slug: string[] }) {
    const slug = params.slug.join('/');
    const guide = allGuides.find((page) => page.slugAsParams === slug);

    if (!guide) return notFound();

    return guide;
}
export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
    const page = await getGuideFromParams(params);

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

async function generateStaticParams(): Promise<GuidePageProps['params'][]> {
    return allGuides.map((page) => ({
        slug: page.slugAsParams.split('/')
    }));
}

export default async function GuidePage({ params }: GuidePageProps) {
    const guide = await getGuideFromParams(params);

    const toc = await getTableOfContents(guide.body.raw);

    return (
        <main className='relative py-6 lg:grid lg:grid-cols-[1fr_300px] lg:gap-10 lg:py-10 xl:gap-20'>
            <div>
                <DocsHeader heading={guide.title} text={guide.description} />
                <Mdx code={guide.body.code} />
                <hr className='my-4' />
                <div className='flex justify-center py-6 lg:py-10'>
                    <Link href={Routes.GUIDE} className={cn(buttonVariants({ variant: 'ghost' }))}>
                        <Icons.chevronLeft className='mr-2 h-4 w-4' />
                        See all guides
                    </Link>
                </div>
            </div>
            <div className='hidden text-sm lg:block'>
                <div className='sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10'>
                    <DashboardTableOfContents toc={toc} />
                </div>
            </div>
        </main>
    );
}
