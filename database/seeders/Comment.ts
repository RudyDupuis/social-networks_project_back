import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { CommentFactory } from 'Database/factories';

export default class extends BaseSeeder {
  public async run () {
    await CommentFactory.createMany(50);
  }
}
