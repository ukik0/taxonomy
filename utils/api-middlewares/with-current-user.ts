import {getServerSession} from "next-auth";
import {NextApiHandler, NextApiRequest, NextApiResponse} from "next";
import {authOptions} from "@/utils/auth";
import {z} from "zod";

export const schema = z.object({
    userId: z.string(),
})


export function withCurrentUser(handler: NextApiHandler) {
    return async function(req: NextApiRequest, res: NextApiResponse) {
        try {
            const query = schema.parse(req.query)
            const session = await getServerSession(req, res, authOptions)

            if (query.userId !== session?.user.id) return res.status(403).end()

            return handler(req, res)
        } catch (e) {
            if (e instanceof z.ZodError) {
                return res.status(422).json(e.issues)
            }

            return res.status(500).end()
        }
    }
}

