import Like from "App/Models/Like";

export default class LikeRepository {

    /**
     * Delete a post's like from his id
     * 
     * @param {number} userId The user's id
     * @param {number} postId The post's id 
     * @returns void
     */
    public async deletePostLike(userId: number, postId: number) {
        await Like
            .query()
            .where('user_id', userId)
            .andWhere('post_id', postId)
            .delete()
    }

    /**
     * Delete a comment's like from his id
     * 
     * @param {number} userId The user's id
     * @param {number} commentId The comment's id 
     * @returns void
     */
    public async deleteCommentLike(userId: number, commentId: number) {
        await Like
            .query()
            .where('user_id', userId)
            .andWhere('comment_id', commentId)
            .delete()
    }

    /**
     * Get a post's likes
     * 
     * @param {number} postId The post's id 
     * @returns void
     */
    public async getLikesFromPost(postId: number): Promise<Like[]> {
        return Like
            .query()
            .where('post_id', postId)
    }

    /**
     * Get a comment's likes
     * 
     * @param {number} commentId The ;comment's id 
     * @returns void
     */
    public async getLikesFromComment(commentId: number): Promise<Like[]> {
        return Like
            .query()
            .where('comment_id', commentId)
    }
}