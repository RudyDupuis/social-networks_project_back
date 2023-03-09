import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, beforeSave, column, HasMany, hasMany, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Post from './Post'
import Comment from './Comment'
import Like from './Like'
import Report from './Report'
import Notification from './Notification'
import { attachment, AttachmentContract } from '@ioc:Adonis/Addons/AttachmentLite'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  // We use this hook to hash the password before it's saved in the database
  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  // Here is @attachment to put and manage the user's avatar with the library Attachment
  @attachment()
  public avatarUrl: AttachmentContract | null

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
    foreignKey: 'author'
  })
  public comments: HasMany<typeof Comment>

  @hasMany(() => Like)
  public likes: HasMany<typeof Like>

  // Relationship to get the reports this user.
  @hasMany(() => Report)
  public reports: HasMany<typeof Report>

  // Relationship to get the reports this user did to other Users
  @hasMany(() => Report, {
    foreignKey: 'reporter'
  })
  public reported: HasMany<typeof Report>

  @hasMany(() => Notification)
  public notifications: HasMany<typeof Notification>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
