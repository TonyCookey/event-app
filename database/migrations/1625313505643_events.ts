import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Events extends BaseSchema {
  protected tableName = 'events'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('event_name').notNullable()
      table.text('event_description', 'longtext')
      table.string('event_category')
      table.string('event_address')
      table.dateTime('event_start_date').notNullable()
      table.dateTime('event_end_date').notNullable()
      table.boolean('is_event_free').defaultTo(true)
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.boolean('is_deleted').defaultTo(false)
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at').defaultTo(this.now())
      // table.dateTime('updated_at').defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
