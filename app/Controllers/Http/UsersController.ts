// app/Controllers/Http/UsersController.ts
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserService from 'App/Services/UserService'

export default class UsersController {
  public async register({ request, response }: HttpContextContract) {
    try {
      const data = request.only(['username', 'email', 'password', 'nama_lengkap'])
      const user = await UserService.register(data)

      return response.created({
        message: 'Registrasi berhasil',
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          token: user.token,
        },
      })
    } catch (error) {
      return response.badRequest({ message: error.message })
    }
  }

  public async login({ request, response }: HttpContextContract) {
    try {
      const data = request.only(['email', 'password'])
      const user = await UserService.login(data)

      return response.ok({
        message: 'Login berhasil',
        data: {
          id: user.id,
          username: user.username,
          email: user.email,
          token: user.token,
        },
      })
    } catch (error) {
      return response.unauthorized({ message: error.message })
    }
  }
}
