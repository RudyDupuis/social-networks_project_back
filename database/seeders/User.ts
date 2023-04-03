import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User';
import UserAvatarCreation from 'App/Services/Factories/UserAvatarCreation';
import { UserFactory } from '../factories'

export default class extends BaseSeeder {
  public async run () {

    // TODO : see if we can do a dependecy injection instead of instanciating an object
    const avatar = await new UserAvatarCreation().create()

    // Create an admin manually
    await User.create({
      username: 'TestAdmin',
      email: 'test_admin@test.com',
      password: 'test',
      avatar: avatar,
      role: 'ADMIN'
    })

    // Create an user manually
    await User.create({
      username: 'TestUser',
      email: 'test_user@test.com',
      password: 'test',
      avatar: avatar,
      role: 'USER'
    })

    // Create 10 random users
    await UserFactory.createMany(10);
  }
}
