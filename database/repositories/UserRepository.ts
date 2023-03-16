import { Exception } from '@adonisjs/core/build/standalone'
import Database from '@ioc:Adonis/Lucid/Database'
import { ModelObject } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class UserRepository {

    /**
     * Get the user's datas from his id
     * 
     * @param {number} id The user's id
     * @param {number | undefined} authId The auth user's id 
     * @returns {Promise<ModelObject>} The user's data in the JSON format
     */
    public async getUserWithHaveSubscribed(id: number, authId: number | undefined): Promise<ModelObject> {

        const user = await User.findOrFail(id)
        // Convert the user from User to JSON format and add a field to check if the current user
        // have subscribed to the user fetched.
        const userJson = user.toJSON()
        userJson.haveSubscribed = false

        // If there is no auth User, we return the JSON directly
        if(!authId) {
            return userJson
        }

        try {
            const subscription = await this.getSubscription(authId, id)
            // If there is a subscription fetched
            if(subscription.length > 0) {
                userJson.haveSubscribed = true
                return userJson
            }
        } catch(e) {
            console.log(e)
        }

        return userJson
    }

    /**
     * Get the user's datas from his id
     * 
     * @param {number} id The user's id
     * @returns {Promise<ModelObject>} The user's data in the JSON format
     */
    public async getUserProfile(id: number): Promise<ModelObject> {
        
        const user = await User
            .query()
            .where('id', id)
            .withCount('posts')
            .preload('posts', (query) => {
                query
                    .withCount('comments')
                    .withCount('likes')
                    .preload('user')
                    .preload('comments', (query) => {
                        query
                            .withCount('likes')
                            .preload('user')
                            .preload('likes', (query) => {
                                query
                                    .preload('user')
                            })
                    })
                    .preload('likes', (query) => {
                        query
                            .preload('user')
                    })
            })
            .first()

        if(!user) {
            throw new Exception("This user doesn't exist", 404)
        }

        // Convert the user from User to JSON format to add the different counts in it.
        const userJson = user.toJSON()
        userJson.posts_count = user.$extras.posts_count
        user.posts.forEach((post, indexPost) => {
            userJson.posts[indexPost].comments_count = post.$extras.comments_count
            userJson.posts[indexPost].likes_count = post.$extras.likes_count

            post.comments.forEach((comment, indexComment) => {
                userJson.posts[indexPost].comments[indexComment].likes_count = comment.$extras.likes_count
            })
        })

        return userJson;
    }

    /**
     * Get a subscription
     * 
     * @param {number} userId The user's id
     * @param {number} subscribesTo The user's id that the first user is subcribed to
     * @returns {Promise<any[]>}
     */
    public getSubscription(userId: number, subscribesTo: number): Promise<ModelObject> {
        return Database
            .from('subscribes')
            .where('subscriber', userId)
            .andWhere('subscribed_to', subscribesTo)
    }

    /**
     * Set a subscription
     * 
     * @param {number} userId The user's id making the subscription
     * @param {number} subscribesTo The user's id that will be subcribed to
     * @returns {Promise<any[]>}
     */
    public async setSubscription(userId: number, subscribesTo: number): Promise<any[]> {
        return Database
            .table('subscribes')
            .returning('id')
            .insert({
                subscriber: userId,
                subscribed_to: subscribesTo
            })
    }

    /**
     * Delete a subscription
     * 
     * @param {number} userId The user's id
     * @param {number} subscribesTo The user's id that the first user is subcribed to
     * @returns {Promise<any[]>}
     */
    public async deleteSubscription(userId: number, subscribesTo: number): Promise<any[]> {
        return Database
            .from('subscribes')
            .where('subscriber', userId)
            .andWhere('subscribed_to', subscribesTo)
            .delete()
    }
}