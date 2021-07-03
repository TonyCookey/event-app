import { DateTime } from 'luxon'
import { BaseModel, column ,belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Event extends BaseModel {
  @belongsTo(() => User)
  public author: BelongsTo<typeof User>
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public event_name: string

  @column()
  public event_description: string

  @column()
  public event_category: string

  @column()
  public event_address: string

  @column.date()
  public event_start_date: DateTime

  @column.date()
  public event_end_date: DateTime

  @column()
  public is_event_free: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
