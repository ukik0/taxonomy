import {NextApiRequest, NextApiResponse} from "next";
import {withMethods} from "@/utils/api-middlewares/with-methods";
import {withCurrentUser} from "@/utils/api-middlewares/with-current-user";
import {getServerSession} from "next-auth";
import {authOptions} from "@/utils/auth";
import {db} from "@/utils/db";
import {userNameSchema} from "@/utils";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PATCH') {
        const session = await getServerSession(req, res, authOptions)
        const payload = userNameSchema.parse(req.body)

        await db.user.update({
            where: {
                id: session?.user.id
            },
            data: {
                name: payload.name
            }
        })

        return res.end()
    }
}

export default withMethods(['PATCH'], withCurrentUser(handler))