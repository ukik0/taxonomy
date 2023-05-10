import {getServerSession} from "next-auth";

import {authOptions} from "@/utils/auth";

export async function getCurrentUser() {
    const session = await getServerSession(authOptions);

    return session?.user;
}
