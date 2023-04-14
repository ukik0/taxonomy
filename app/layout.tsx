import '@/styles/globals.css';
import {ReactNode} from 'react';
import {Inter as FontSans} from 'next/font/google';
import {absoluteUrl, cn} from '@/utils/utils';

import {siteConfig} from '@/config/site';

const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-inter'
});

interface RootLayoutProps {
    children: ReactNode;
}

export const metadata = {
    title: {
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`
    },
    description: siteConfig.description,
    keywords: ['Next.js', 'React', 'Tailwind CSS', 'Server Components', 'Radix UI'],
    authors: [
        {
            name: 'shadcn',
            url: 'https://shadcn.com'
        }
    ],
    creator: 'shadcn',
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' }
    ],
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
        images: [
            {
                url: absoluteUrl('/og.jpg'),
                width: 1200,
                height: 630,
                alt: siteConfig.name
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.name,
        description: siteConfig.description,
        images: [`${siteConfig.url}/og.jpg`],
        creator: '@shadcn'
    },
    icons: {
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png'
    },
    manifest: `${siteConfig.url}/site.webmanifest`
};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang='en' className={cn('bg-white font-sans text-slate-900 antialiased', fontSans.variable)}>
            <head />
            <body>{children}</body>
        </html>
    );
}
