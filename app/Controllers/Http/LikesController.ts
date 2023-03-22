import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Like from 'App/Models/Like';
import LikeRepository from "Database/repositories/LikeRepository";

export default class LikesController {
    constructor(private likeRepository: LikeRepository) {
        this.likeRepository = new LikeRepository
    }

    public async create(ctx: HttpContextContract): Promise<void> {
        let message: string
        let statusCode: number

        const userId: number = ctx.auth.user!.id
        const postId: number|undefined = ctx.params.post_id
        const commentId: number|undefined = ctx.params.comment_id

        try {
            await Like.create({
                userId: userId,
                postId: postId,
                commentId: commentId
            })

            message = 'The like was successfully created'
            statusCode = 201
        } catch (e) {
            // Default error message and status code
            message = 'The like could not be created : ' + e
            statusCode = 400
            
            // If the "unique" constraint is broke, we change the message and the status code
            if(e.routine === '_bt_check_unique') {
                message = 'This like already exists'
                statusCode = 409
            }
        }

        return ctx.response.status(statusCode).json({message: message})
    }

    public async delete(ctx: HttpContextContract): Promise<void> {
        let message: string
        let statusCode: number

        const userId: number = ctx.auth.user!.id
        const postId: number|undefined = ctx.params.post_id
        const commentId: number|undefined = ctx.params.comment_id

        try {
            if(postId) {
                this.likeRepository.deletePostLike(userId, postId)
            }

            if(commentId) {
                this.likeRepository.deleteCommentLike(userId, commentId)

            }

            message = 'The like was successfully suppressed'
            statusCode = 200
        } catch (e) {
            // Default error message and status code
            message = 'The like could not be suppressed : ' + e
            statusCode = 400
        }

        return ctx.response.status(statusCode).json({message: message})
    }
}
