import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User';
import { UserFactory } from '../factories'

export default class extends BaseSeeder {
  public async run () {
    await User.create({
      username: 'Test',
      email: 'test@test.com',
      password: 'test',
      avatarUrl: 'test.png',
      role: 'ADMIN'
    })
    await UserFactory.createMany(10);
  }
}
