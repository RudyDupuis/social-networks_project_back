import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { PostFactory } from 'Database/factories';

export default class extends BaseSeeder {
  public async run () {
    //! Can't run this seeder yet. Need to either create manually the seed
    //! or find a logic in the factory to avoid multiples identical entries
    // await PostFactory.createMany(10);
  }
}
