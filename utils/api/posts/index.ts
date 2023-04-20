import {db} from "@/utils/db";

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
    },
    createPost: async () => {
        return fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'Untitled Post'
            })
        });
    },
    deletePost: async (postId: string) => {
        return fetch(`/api/posts/${postId}`, {
            method: "DELETE",
        })
    }
};
