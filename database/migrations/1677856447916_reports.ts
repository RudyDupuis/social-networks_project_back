import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'reports'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('reporter').unsigned().references('users.id').notNullable()
      table.integer('user_id').unsigned().references('users.id').nullable()
      table.integer('post_id').unsigned().references('posts.id').nullable()
      table.integer('comment_id').unsigned().references('comments.id').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      table.unique(['reporter', 'user_id', 'post_id', 'comment_id'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
