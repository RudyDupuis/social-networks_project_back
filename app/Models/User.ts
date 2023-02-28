import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
