import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import { v4 as uuidv4 } from 'uuid'
import Conversation from 'App/Models/Conversation'
import PostQuestionValidator from 'App/Validators/PostQuestionValidator'
import axios from 'axios'

export default class ChatController {
  /**
   * 1. Kirim Pertanyaan (POST /questions)
   */
  public async store({ request, response }: HttpContextContract) {
    const trx = await Database.transaction()

    try {
      const payload = await request.validate(PostQuestionValidator)
      let sessionId = payload.session_id

      let conversation: Conversation | null = null

      if (sessionId) {
        conversation = await Conversation.query({ client: trx }).where('session_id', sessionId).first()
      }

      if (!conversation) {
        sessionId = uuidv4()
        conversation = new Conversation()
        conversation.useTransaction(trx)
        conversation.sessionId = sessionId
        await conversation.save()
      }

      await conversation.related('messages').create({
        senderType: 'user',
        message: payload.question,
      }, { client: trx })

      const externalApiUrl = 'https://api.majadigidev.jatimprov.go.id/api/external/chatbot/send-message'

      const apiResponse = await axios.post(externalApiUrl, {
        session_id: sessionId,
        message: payload.question,
      })

      const botResponse = apiResponse.data?.data?.message || 'Tidak ada respons dari bot.'

      await conversation.related('messages').create({
        senderType: 'bot',
        message: botResponse,
      }, { client: trx })

      conversation.lastMessage = botResponse
      await conversation.save()

      await trx.commit()

      return response.ok({
        session_id: sessionId,
        reply: botResponse,
      })
    } catch (error) {
      await trx.rollback()
      console.error('ChatController.store error:', error)

      return response.internalServerError({
        message: 'Terjadi kesalahan saat memproses permintaan Anda.',
        error: error?.message || error,
      })
    }
  }

  /**
   * 2. Ambil semua Conversation (GET /conversations)
   */
  public async index({ request, response }: HttpContextContract) {
    const { page = 1, perPage = 10 } = request.qs()

    const conversations = await Conversation
      .query()
      .orderBy('updated_at', 'desc')
      .paginate(Number(page), Number(perPage))

    return response.ok(conversations)
  }

  /**
   * 3. Ambil message dari Conversation (GET /conversations/:id)
   */
  public async show({ params, response }: HttpContextContract) {
    const conversation = await Conversation.findOrFail(params.id)

    const messages = await conversation.related('messages').query().orderBy('created_at', 'asc')

    return response.ok({
      conversation,
      messages,
    })
  }

  /**
   * 4. Hapus Conversation (DELETE /conversations/:id)
   */
  public async destroy({ params, response }: HttpContextContract) {
    const conversation = await Conversation.findOrFail(params.id)
    await conversation.delete()

    return response.noContent()
  }
}
