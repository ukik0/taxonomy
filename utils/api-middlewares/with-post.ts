import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';
import {getServerSession} from 'next-auth';
import {z} from 'zod';

import {authOptions} from '@/utils/auth';
import {db} from '@/utils/db';

export const schema = z.object({
    postId: z.string()
});

export function withPost(handler: NextApiHandler) {
    return async function (req: NextApiRequest, res: NextApiResponse) {
        try {
            const query = schema.parse(req.query);
            const session = await getServerSession(req, res, authOptions);

            const count = await db.post.count({
                where: {
                    id: query.postId,
                    authorId: session?.user.id
                }
            });

            if (count < 1) return res.status(403).end();

            return handler(req, res);
        } catch (e) {
            if (e instanceof z.ZodError) {
                return res.status(422).json(e.issues);
            }

            return res.status(500).end();
        }
    };
}
