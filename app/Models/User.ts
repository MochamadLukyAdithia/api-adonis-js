import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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
  public nama_lengkap: string

  @column()
  public role: 'admin' | 'user'

  @column()
  public is_active: boolean

  @column.dateTime()
  public last_login_at: DateTime | null

  @column()
  public token: string | null // ← tambahkan ini

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
