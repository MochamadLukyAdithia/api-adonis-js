import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MessageService from 'App/Services/MessagesService'

export default class MessagesController {
    private messagesService = new MessageService()
    public async delete({ params, response }: HttpContextContract) {
    await this.messagesService.delete(params.id)
    return response.noContent()
  }

}
