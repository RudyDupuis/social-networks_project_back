import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Post from './Post'
import Report from './Report'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public message: string

  // Here is the foreign key towards User
  @column()
  public author: number

  // Here is the relationship to the User entity. The foreign key parameter needs to point on the author one to work properly
  @belongsTo(() => User, {
    foreignKey: 'author'
  })
  public user: BelongsTo<typeof User>

  // Here is the foreign key towards Post
  @column()
  postId: number
  
  // Here is the relationship to the Post entity. No need to add the foreign key paramater. The default one will be postId
  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>

  @hasMany(() => Report)
  public reports: HasMany<typeof Report>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
