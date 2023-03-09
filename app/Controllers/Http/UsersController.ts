import { OpaqueTokenContract } from '@ioc:Adonis/Addons/Auth'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    
    /**
     * Create a new user
     * 
     * @param {HttpContextContract} ctx - The HTTP Context for the request. 
     * @returns {Promise<void>} Return the request's status
     */
    public async create(ctx: HttpContextContract): Promise<void> {
        let message: string
        let statusCode: number

        try {
            await User.create({
                username: ctx.request.input('username'),
                email: ctx.request.input('email'),
                password: ctx.request.input('password')
            })

            message = 'The user was successfully created'
            statusCode = 201
        } catch(e) {
            message = 'The user could not be created : ' + e
            statusCode = 400
        }
        
        return ctx.response.status(statusCode).json({message: message})
    }
    
    /**
     * Route to login the user
     * 
     * @param {HttpContextContract} ctx - The HTTP Context for the request.
     * @returns {Promise<OpaqueTokenContract<User>|void>} Return a token if successful, or reject with an exception
     */
    public async login(ctx: HttpContextContract): Promise<OpaqueTokenContract<User>|void> {
        const email: string = ctx.request.input('email')
        const password: string = ctx.request.input('password')

        // Verifies if the credentials are correct. If so, we send back a token
        // Otherwise, we return an exception
        try {
            const token = await ctx.auth.use('api').attempt(email, password, {
                expiresIn: '30 mins'
            })
            return token
        } catch {
            return ctx.response.unauthorized('Invalid credentials')
        }
    }

    /**
     * Route to logout the user
     * 
     * @param {HttpContextContract} ctx - The HTTP Context for the request.
     * @returns {Promise<|void>} Return a token if successful, or reject with an exception
     */
    public async logout(ctx: HttpContextContract): Promise<OpaqueTokenContract<User>|void> {
        let message: string
        let statusCode: number
        
        // Try to logout the user
        try {
            await ctx.auth.use('api').revoke()
            message = 'Loged out successfully'
            statusCode = 200
        } catch (e) {
            message = 'Error while loging out'
            statusCode = 400
        }

        ctx.response.status(statusCode).json({message: message})
    }

    public async showProfile(ctx: HttpContextContract) {
        
        const routeName: string|undefined = ctx.route?.name
        let userId: number

        // Verifies if the routes used to come here are the one to show other users profiles
        // If so, we put the id from the url's params. Otherwise, we put the id of the auth user
        userId = (routeName === 'user.show.profile') ? ctx.params.id : ctx.auth.user?.id
        
        // We fetch the user informations, his posts, the comments related to the posts and their author
        const user = await User
            .query()
            .where('id', userId)
            .preload('posts', (postsQuery) => {
                postsQuery.preload('comments', (commentsQuery) => {
                    commentsQuery.preload('user')
                })
            })

        return user;
    }
}
