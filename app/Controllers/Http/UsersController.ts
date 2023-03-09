import { OpaqueTokenContract } from '@ioc:Adonis/Addons/Auth'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
    
    public async create(ctx: HttpContextContract) {
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
        // Get the user credentials from the request
        const email = ctx.request.input('email')
        const password = ctx.request.input('password')

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
}
