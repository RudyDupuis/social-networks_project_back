import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Like from 'App/Models/Like';
import LikeRepository from "Database/repositories/LikeRepository";

export default class LikesController {
    constructor(private likeRepository: LikeRepository) {
        this.likeRepository = new LikeRepository
    }

    /**
     * Create a new like
     * 
     * @param {HttpContextContract} ctx - The HTTP Context for the request. 
     * @returns {Promise<void>} Return the request's status
     */
    public async create(ctx: HttpContextContract): Promise<void> {
        let message: string
        let statusCode: number

        // Get the different params
        // Either postId or commentId will be null. That's not a problem
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

    /**
     * Delete a like
     * 
     * @param {HttpContextContract} ctx - The HTTP Context for the request. 
     * @returns {Promise<void>} Return the request's status
     */
    public async delete(ctx: HttpContextContract): Promise<void> {
        let message: string
        let statusCode: number

        // Get the route's name used to come in this controller
        const routeName = ctx.route?.name!
        const userId: number = ctx.auth.user!.id

        try {
            if(routeName === 'like.post.delete') {
                const postId: number = ctx.params.post_id
                await this.likeRepository.deletePostLike(userId, postId)
            }

            if(routeName === 'like.comment.delete') {
                const commentId: number = ctx.params.comment_id
                await this.likeRepository.deleteCommentLike(userId, commentId)
            }

            message = 'The like was successfully suppressed'
            statusCode = 200
        } catch (e) {
            message = 'The like could not be suppressed : ' + e
            statusCode = 400
        }

        return ctx.response.status(statusCode).json({message: message})
    }

    /**
     * Get the likes of a post or a comment
     * 
     * @param {HttpContextContract} ctx - The HTTP Context for the request. 
     * @returns {Promise<void>} Return the request's status
     */
    public async getByPostOrCommentId(ctx: HttpContextContract): Promise<void> {
        let message: string
        let statusCode: number

        // Get the route's name used to come in this controller
        // And initiate the variable that will contains the likes
        const routeName = ctx.route?.name!
        let likes: Like[];

        try {
            if(routeName === 'like.post.get') {
                const postId: number = ctx.params.post_id
                likes = await this.likeRepository.getLikesFromPost(postId)
            }

            if(routeName === 'like.comment.get') {
                const postId: number = ctx.params.comment_id
                likes = await this.likeRepository.getLikesFromComment(postId)
            }

            message = 'The likes were successfully fetched'
            statusCode = 200
        } catch (e) {
            message = 'The likes could not be fetch : ' + e
            statusCode = 400
        }
        
        return ctx.response.status(statusCode).json({message: message, datas: likes!})
    }
}
