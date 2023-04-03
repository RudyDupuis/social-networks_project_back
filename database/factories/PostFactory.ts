import Post from 'App/Models/Post'
import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'

export default Factory.define(Post, async ({ faker }) => {
  // Get a random user and put his id in the fake data generated for the relationship (foreign key)
  const user = await User.query().orderByRaw('RANDOM()').first()
  const userId = user?.$getAttribute('id');

  return {
    message: faker.lorem.sentences(10),
    author: userId,
  }
}).build()
