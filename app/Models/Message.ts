import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import type { BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Conversation from 'App/Models/Conversation'

export default class Message extends BaseModel {
  @column({ isPrimary: true })
  public id: number

@column()
public conversationId: number


  @column()
  public senderType: 'user' | 'bot' 

  @column()
  public message: string 

  @belongsTo(() => Conversation)
  public conversation: BelongsTo<typeof Conversation>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
