import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(User, ({ faker }) => {
  return {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    avatarUrl: faker.internet.avatar(),
    role: faker.helpers.arrayElement(['USER', 'ADMIN']),
  }
}).build()
