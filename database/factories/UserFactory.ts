import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import UserAvatarCreation from 'App/Services/Factories/UserAvatarCreation'

export default Factory.define(User, async ({ faker }) => {
  
  // TODO : see if we can do a dependecy injection instead of instanciating an object
  const avatar = await new UserAvatarCreation().create()

  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    avatarUrl: avatar,
    role: faker.helpers.arrayElement(['USER']),
  }

}).build()
