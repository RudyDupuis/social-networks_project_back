import Comment from 'App/Models/Comment'
import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User';
import Post from 'App/Models/Post';

export default Factory.define(Comment, async ({ faker }) => {
  // Get a random user and put his id in the fake data generated for the relationship (foreign key)
  const user = await User.query().orderByRaw('RANDOM()').first()
  const userId = user?.$getAttribute('id');

  // Same as above but for the post
  const post = await Post.query().orderByRaw('RANDOM()').first()
  const postId = post?.$getAttribute('id');

  return {
    message: faker.lorem.sentence(),
    author: userId,
    postId: postId
  }
}).build()
