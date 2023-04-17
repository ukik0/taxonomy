import {NextApiRequest, NextApiResponse} from 'next';
import {postPatchSchema} from '@/utils';
import {z} from 'zod';

import {withMethods} from '@/utils/api-middlewares/with-methods';
import {withPost} from '@/utils/api-middlewares/with-post';
import {db} from '@/utils/db';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        try {
             await db.post.delete({ where: { id: req.query.postId as string } });

            return res.status(204).end();
        } catch (e) {
            return res.status(500).end();
        }
    }

    if (req.method === 'PATCH') {
        try {
            const postId = req.query.postId as string;
            const post = await db.post.findUnique({
                where: {
                    id: postId
                }
            });

            if (!post) throw new Error('Post not found');

            const body = postPatchSchema.parse(req.body);

            await db.post.update({
                where: {
                    id: postId
                },
                data: {
                    title: body.title || post.title,
                    content: body.content
                }
            });

            return res.end();
        } catch (e) {
            if (e instanceof z.ZodError) {
                return res.status(422).json(e.issues);
            }

            return res.status(422).end();
        }
    }
}

export default withMethods(['DELETE', 'PATCH'], withPost(handler));
