import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'subscribes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('subscriber').unsigned().references('users.id').notNullable()
      table.integer('subscribed_to').unsigned().references('users.id').notNullable()
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      // Makes unable to an user subscribing to the same user twice in the database
      table.unique(['subscriber', 'subscribed_to'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
