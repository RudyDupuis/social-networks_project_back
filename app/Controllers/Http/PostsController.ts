import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import { schema } from '@ioc:Adonis/Core/Validator'

export default class PostsController {
    
    public async create(ctx: HttpContextContract): Promise<void> {
        let message: string
        let statusCode: number

        /**
         * Step 1 - Define schema
         */
        const newPostSchema = schema.create({
            message: schema.string(),
        })

        
        try {
            /**
             * Step 2 - Validate request body against
             *          the schema
             */
            const payload = await ctx.request.validate({
                schema: newPostSchema
            })

            /**
             * Step 3 - Create new post
             */
            const post = new Post()
            post.message = payload.message
            post.author = ctx.auth.user?.id!

            await post.save()

            /**
             * Step 4 - Return response
             */
            message = 'Post successfully add'
            statusCode = 201
            return ctx.response.status(statusCode).json({message: message, post: post})
        } catch (e) {
                /**-
                 * Step 5 - Handle errors
                 */
                message = 'Somethings is wrong' + e
                statusCode = 404
                return ctx.response.status(statusCode).json({ message: message })
        }
    }
}
