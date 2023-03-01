import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public message: string

  @column()
  public tags: string

  // Here is the foreign key towards User
  @column()
  public author: number

  // Here is the relationship to the User entity. The foreign key parameter needs to point on the author one to work properly
  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'author'
  })
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
