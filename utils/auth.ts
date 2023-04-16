import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/github';

import { Routes } from '@/utils/constants';
import { db } from '@/utils/db';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: Routes.LOGIN
    },
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || '',
            clientSecret: process.env.GITHUB_CLIENT_SECRET || ''
        }),
        EmailProvider({
            // @ts-ignore
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM
        })
    ],
    callbacks: {
        async session({ token, session }) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
            }

            return session;
        },
        async jwt({ token, user }) {
            const dbUser = await db.user.findFirst({
                where: {
                    email: token.email
                }
            });

            if (!dbUser) {
                if (user) {
                    token.id = user?.id;
                }
                return token;
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image
            };
        }
    }
};
