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

  public async readAll({ request, response }: HttpContextContract) {
    const { page = 1, perPage = 10 } = request.qs()
    const conversations = await this.conversationService.readAll(Number(page), Number(perPage))
    return response.ok(conversations)
  }

  public async readById({ params, response }: HttpContextContract) {
    const data = await this.conversationService.readById(params.id)
    return response.ok(data)
  }

  public async delete({ params, response }: HttpContextContract) {
  const result = await this.conversationService.delete(params.id);

  if (result.success) {
    return response.ok(result); 
  } else {
    return response.badRequest(result); 
  }
}

}
