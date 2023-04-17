import type {NextApiHandler, NextApiRequest, NextApiResponse} from 'next';

type methods = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT'

export function withMethods(methods: methods[], handler: NextApiHandler) {
    return async function (req: NextApiRequest, res: NextApiResponse) {
        if (req.method && !methods.includes(req.method as methods)) {
            return res.status(405).end();
        }

        return handler(req, res);
    };
}
