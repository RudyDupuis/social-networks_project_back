import { Exception } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/**
 * IsAdmin middleware is meant to restrict access to a given route to User
 * having the 'ADMIN' role only.
 */
export default class IsAdmin {
  public async handle({auth}: HttpContextContract, next: () => Promise<void>) {
    // Get the current logged user
    let user = auth.user;

    // If the user doesn't have the 'ADMIN' role, we throw an exception.
    if(user?.$attributes.role !== 'ADMIN') {
      throw new Exception('Unauthorized access', 403)
    }

    // Otherwise, we go to the controller (or next middleware)
    await next()
  }
}
