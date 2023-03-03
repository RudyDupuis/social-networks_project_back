import Like from 'App/Models/Like'
import Factory from '@ioc:Adonis/Lucid/Factory'
import Post from 'App/Models/Post';
import User from 'App/Models/User';

export default Factory.define(Like, async ({ faker }) => {
  // TODO create a logic here to avoid having twice a same user liking a same post
  //! Can't use this factory yet

  // Get a random user and put his id in the fake data generated for the relationship (foreign key)
  const user = await User.query().orderByRaw('RANDOM()').first()
  const userId = user?.$getAttribute('id');

  // Same as above but for the post
  const post = await Post.query().orderByRaw('RANDOM()').first()
  const postId = post?.$getAttribute('id');
  
  return {
    userId: userId,
    postId: postId
  }
}).build()
