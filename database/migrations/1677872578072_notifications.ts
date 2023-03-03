import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'notifications'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').unsigned().references('users.id').notNullable()
      table.integer('like_id').unsigned().references('likes.id').nullable()
      table.integer('comment_id').unsigned().references('comments.id').nullable()


      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      // Makes unable an user to have the same notification in the database
      table.unique(['user_id', 'like_id', 'comment_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
