import { BaseCommand } from '@adonisjs/core/build/standalone'

export default class PurgeOldTokens extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'purge:old_tokens'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest` 
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call 
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public async run() {
    // Import here the Database (and not at the top because the app needs to be loaded before the import)
    const Database = await import('@ioc:Adonis/Lucid/Database')

    try {
      // Get the current date and time and delete the tokens that expire before 'now'
      const now = new Date().toISOString();
      const rows = await Database.default.from('api_tokens').where('expires_at', '<', now).delete()

      // Shows some informations in the terminal
      this.logger.info(`Purged ${rows} expired tokens`)
      this.logger.success('Tokens purged successfully')
    } catch (error) {
      this.logger.error(error)
    }
  }
}
