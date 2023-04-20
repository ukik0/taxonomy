import {db} from '@/utils/db';

export const postsApi = {
    getUserPosts: async (id: string) => {
        return db.post.findMany({
            where: { authorId: id },
            select: { id: true, title: true, published: true, createdAt: true },
            orderBy: { updatedAt: 'desc' }
        });
    },
    getCurrentPost: async (postId: string) => {
        return db.post.findUnique({
            where: {
                id: postId
            }
        });
    }
};
