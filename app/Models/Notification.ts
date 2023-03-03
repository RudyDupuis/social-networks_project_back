import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Comment from './Comment'
import Like from './Like'
import User from './User'

export default class Notification extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  // Here is the foreign key towards User
  @column()
  public userId: number

  // Here is the relationship to the User entity. No need to add the foreign key paramater. The default one will be userId
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  // Here is the foreign key towards Like
  @column()
  likeId: number
  
  // Here is the relationship to the Like entity. No need to add the foreign key paramater. The default one will be likeId
  @belongsTo(() => Like)
  public like: BelongsTo<typeof Like>

  // Here is the foreign key towards Comment
  @column()
  commentId: number
  
  // Here is the relationship to the Comment entity. No need to add the foreign key paramater. The default one will be commentId
  @belongsTo(() => Comment)
  public comment: BelongsTo<typeof Comment>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
