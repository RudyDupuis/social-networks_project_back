import { Exception } from '@adonisjs/core/build/standalone'
import { ModelObject } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class UserRepository {

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
            .preload('posts', (postsQuery) => {
                postsQuery
                    .withCount('comments')
                    .withCount('likes')
                    .preload('comments', (commentsQuery) => {
                        commentsQuery
                            .withCount('likes')
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
}