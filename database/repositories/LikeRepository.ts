import Like from "App/Models/Like";

export default class LikeRepository {
    public async getPostLikes(postId: number) {
        const likes = await Like
            .query()
            .where('post_id', postId)

        return likes
    }

    public async getCommentLikes(commentId: number) {
        const likes = await Like
            .query()
            .where('comment_id', commentId)

        return likes
    }
}