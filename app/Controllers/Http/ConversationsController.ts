import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PostQuestionValidator from 'App/Validators/PostQuestionValidator'
import ConversationService from 'App/Services/ConversationService'

export default class ConversationsController {
  private conversationService = new ConversationService()

  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(PostQuestionValidator)
      const result = await this.conversationService.create(payload)
      return response.ok(result)
    } catch (error) {
      console.error('ConversationController.create error:', error)
      return response.internalServerError({
        message: 'Terjadi kesalahan saat memproses permintaan Anda.',
        error: error?.message || error,
      })
    }
  }
}
