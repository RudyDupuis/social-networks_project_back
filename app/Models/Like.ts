import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Post from './Post'
import User from './User'
import Comment from './Comment'
import Notification from './Notification'

export default class Like extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  // Here is the foreign key towards User
  @column()
  userId: number
  
  // Here is the relationship to the User entity. No need to add the foreign key paramater. The default one will be userId
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  // Here is the foreign key towards Post
  @column()
  postId: number
  
  // Here is the relationship to the Post entity. No need to add the foreign key paramater. The default one will be postId
  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>

  // Here is the foreign key towards Comment
  @column()
  commentId: number
  
  // Here is the relationship to the Comment entity. No need to add the foreign key paramater. The default one will be commentId
  @belongsTo(() => Comment)
  public comment: BelongsTo<typeof Comment>

  @hasMany(() => Notification)
  public notifications: HasMany<typeof Notification>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
