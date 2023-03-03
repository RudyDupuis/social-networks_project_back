import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Post from './Post'
import Comment from './Comment'
import Like from './Like'
import Report from './Report'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public avatarUrl: string | null

  @column()
  public role: string
  
  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'subscribed_to',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'subscriber',
  })
  public subscribers: ManyToMany<typeof User>

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'subscriber',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'subscribed_to',
  })
  public subscribed_to: ManyToMany<typeof User>

  @hasMany(() => Post, {
    localKey: 'id',
    foreignKey: 'author'
  })
  public posts: HasMany<typeof Post>

  @hasMany(() => Comment, {
    localKey: 'id',
    foreignKey: 'author'
  })
  public comments: HasMany<typeof Comment>

  @hasMany(() => Like)
  public likes: HasMany<typeof Like>

  // Relationship to get the reports this user.
  @hasMany(() => Report, {
    localKey: 'id',
  })
  public reports: HasMany<typeof Report>

  // Relationship to get the reports this user did to other Users
  @hasMany(() => Report, {
    localKey: 'id',
    foreignKey: 'reporter'
  })
  public reported: HasMany<typeof Report>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
