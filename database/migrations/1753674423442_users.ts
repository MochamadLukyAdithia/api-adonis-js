import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('username', 50).notNullable().unique()
      table.string('email', 100).notNullable().unique()
      table.string('password').notNullable()
      table.string('nama_lengkap', 100)
      table.enum('role', ['admin', 'user']).defaultTo('user')
      table.boolean('is_active').defaultTo(true)
      table.timestamp('last_login_at', { useTz: true }).nullable()

      table.string('token', 255).nullable() // ← tambahkan ini

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
