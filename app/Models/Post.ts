import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Comment from './Comment'
import Like from './Like'
import Report from './Report'

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
    foreignKey: 'author'
  })
  public user: BelongsTo<typeof User>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @hasMany(() => Like)
  public likes: HasMany<typeof Like>

  @hasMany(() => Report)
  public reports: HasMany<typeof Report>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
