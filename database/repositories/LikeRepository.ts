import Like from "App/Models/Like";

export default class LikeRepository {

    /**
     * Delete a post's like from his id
     * 
     * @param {number} userId The user's id
     * @param {number} postId The post'ss id 
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
     * @param {number} commentId The post'ss id 
     * @returns void
     */
    public async deleteCommentLike(userId: number, commentId: number) {
        await Like
            .query()
            .where('user_id', userId)
            .andWhere('comment_id', commentId)
            .delete()
    }
}