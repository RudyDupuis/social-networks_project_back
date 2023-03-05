import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User';
import { UserFactory } from '../factories'

export default class extends BaseSeeder {
  public async run () {
    // Create an admin manually
    await User.create({
      username: 'TestAdmin',
      email: 'test_admin@test.com',
      password: 'test',
      avatarUrl: 'test.png',
      role: 'ADMIN'
    })

    // Create an user manually
    await User.create({
      username: 'TestUser',
      email: 'test_user@test.com',
      password: 'test',
      avatarUrl: 'test.png',
      role: 'USER'
    })

    // Create 10 random users
    await UserFactory.createMany(10);
  }
}
