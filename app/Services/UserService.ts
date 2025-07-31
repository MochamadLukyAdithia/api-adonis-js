// app/Services/UserService.ts
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

export default class UserService {
  public static async register(data: {
    username: string
    email: string
    password: string
    nama_lengkap?: string
  }) {
    const user = new User()
    user.username = data.username
    user.email = data.email
    user.password = await Hash.make(data.password)
    user.nama_lengkap = data.nama_lengkap || ''
    user.role = 'user'
    user.token = uuidv4()
    await user.save()
    return user
  }

  public static async login(data: {
    email: string
    password: string
  }) {
    const user = await User.query().where('email', data.email).first()

    if (!user) {
      throw new Error('Email tidak ditemukan')
    }

    const isValid = await Hash.verify(user.password, data.password)

    if (!isValid) {
      throw new Error('Password salah')
    }

    user.last_login_at = DateTime.now()
    user.token = uuidv4()
    await user.save()

    return user
  }
}
