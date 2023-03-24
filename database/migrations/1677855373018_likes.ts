import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'likes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').unsigned().references('users.id').notNullable()
      table.integer('post_id').unsigned().references('posts.id').nullable()
      table.integer('comment_id').unsigned().references('comments.id').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      // Makes unable an user to likes twice the same post in the database
      table.unique(['user_id', 'post_id'])
      table.unique(['user_id', 'comment_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
