import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MessageService from 'App/Services/MessagesService'

export default class MessagesController {
  private messageService = new MessageService()

  public async readAll({ request, response }: HttpContextContract) {
    const { page = 1, perPage = 10 } = request.qs()
    const conversations = await this.messageService.readAll(Number(page), Number(perPage))
    return response.ok(conversations)
  }

  public async readById({ params, response }: HttpContextContract) {
    const data = await this.messageService.readById(params.id)
    return response.ok(data)
  }

  public async delete({ params, response }: HttpContextContract) {
    await this.messageService.delete(params.id)
    return response.noContent()
  }
}
