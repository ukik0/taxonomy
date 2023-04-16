import {NextResponse} from 'next/server';
import {Routes} from '@/utils';
import {getToken} from 'next-auth/jwt';
import {withAuth} from 'next-auth/middleware';

export default withAuth(
    async function middleware(req) {
        const token = await getToken({ req });
        const isAuth = !!token;
        const isAuthPage =
            req.nextUrl.pathname.startsWith(Routes.LOGIN) || req.nextUrl.pathname.startsWith(Routes.REGISTER);

        if (isAuthPage) {
            if (isAuth) {
                return NextResponse.redirect(new URL('/dashboard', req.url));
            }

            return null;
        }

        if (!isAuth) {
            let from = req.nextUrl.pathname;
            if (req.nextUrl.search) {
                from += req.nextUrl.search;
            }

            return NextResponse.redirect(
                new URL(`${Routes.LOGIN}?from=${encodeURIComponent(from)}`, req.url)
            );
        }
    },
    {
        callbacks: {
            async authorized() {
                return true;
            }
        }
    }
);

export const config = {
    matcher: ['/dashboard/:path*', '/editor/:path*', '/login', '/register']
};
