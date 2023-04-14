import Link from 'next/link';

import {siteConfig} from '@/config/site';
import {Icons} from '@/components/icons';

export const Footer = () => {
    return (
        <footer className='container bg-white text-slate-600'>
            <div className='flex  flex-col items-center justify-between gap-4 border-t border-t-slate-200 py-10 md:h-24 md:flex-row md:py-0'>
                <div className='flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0'>
                    <Icons.logo />
                    <p className='text-center text-sm leading-loose md:text-left'>
                        Built by{' '}
                        <Link
                            href={siteConfig.links.twitter}
                            target='_blank'
                            rel='noreferrer'
                            className='font-medium underline underline-offset-4'
                        >
                            ukik0
                        </Link>
                        . Hosted on{' '}
                        <Link
                            href='https://vercel.com'
                            target='_blank'
                            rel='noreferrer'
                            className='font-medium underline underline-offset-4'
                        >
                            Vercel
                        </Link>
                        . Illustrations by{' '}
                        <Link
                            href='https://popsy.co'
                            target='_blank'
                            rel='noreferrer'
                            className='font-medium underline underline-offset-4'
                        >
                            Popsy
                        </Link>
                        .
                    </p>
                </div>
                <p className='text-center text-sm md:text-left'>
                    The source code is available on{' '}
                    <Link
                        href={siteConfig.links.github}
                        target='_blank'
                        rel='noreferrer'
                        className='font-medium underline underline-offset-4'
                    >
                        GitHub
                    </Link>
                    .
                </p>
            </div>
        </footer>
    );
};
