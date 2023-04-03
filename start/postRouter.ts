import Route from '@ioc:Adonis/Core/Route'
import Post from 'App/Models/Post'
import { schema } from '@ioc:Adonis/Core/Validator'

Route.post('posts', async ({ request, response }) => {
    
    /**
   * Step 1 - Define schema
   */
    const newPostSchema = schema.create({
        title: schema.string(),
        message: schema.string(),
        tags: schema.string()
    })

    try {
        /**
         * Step 2 - Validate request body against
         *          the schema
         */
        const payload = await request.validate({
        schema: newPostSchema
        })

        /**
         * Step 3 - Create new post
         */
        const post = new Post()
        post.title = payload.title
        post.message = payload.message
        post.tags = payload.tags

        await post.save()

        /**
         * Step 4 - Return response
         */
        return response.created(post)
        // return response.status(201).json({
        //   success: true,
        //   message: "Post successfully add",
        //   post: post
        // })

  } catch (err) {
    /**
     * Step 5 - Handle errors
     */
    response.badRequest(err.messages)
    // response.status(404).json({
    //   success: false,
    //   message: "Somethings is wrong",
    //   error: err
    // })
  }
})