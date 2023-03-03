import Application from '@ioc:Adonis/Core/Application'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'

export default class extends BaseSeeder {
  
  private async runSeeder(Seeder: { default: typeof BaseSeeder }) {
    /**
     * Do not run when not in dev mode and seeder is development
     * only
     */
    if (Seeder.default.developmentOnly && !Application.inDev) {
      return
    }

    await new Seeder.default(this.client).run()
  }

  // Run the seeders in the correct order
  public async run () {
    await this.runSeeder(await import('../User'))
    await this.runSeeder(await import('../Post'))
    await this.runSeeder(await import('../Comment'))
  }
}
