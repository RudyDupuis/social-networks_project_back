import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Comment from 'App/Models/Comment'
import Like from 'App/Models/Like'
import Notification from 'App/Models/Notification'
import Post from 'App/Models/Post'
import Report from 'App/Models/Report'
import User from 'App/Models/User'

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

  public async run () {
    // Delete the old datas in the correct order
    await Like.query().delete()
    await Notification.query().delete()
    await Report.query().delete()
    await Database.from('subscribes').delete()
    await Database.from('api_tokens').delete()
    await Comment.query().delete()
    await Post.query().delete()
    await User.query().delete()

    // Run the seeders in the correct order
    await this.runSeeder(await import('../User'))
    await this.runSeeder(await import('../Post'))
    await this.runSeeder(await import('../Comment'))
  }
}
