import Like from "App/Models/Like";

export default class LikeRepository {

    public async deletePostLike(userId: number, postId: number) {
        await Like
            .query()
            .where('user_id', userId)
            .andWhere('post_id', postId)
            .delete()
    }

    public async deleteCommentLike(userId: number, commentId: number) {
        await Like
            .query()
            .where('user_id', userId)
            .andWhere('comment_id', commentId)
            .delete()
    }
}