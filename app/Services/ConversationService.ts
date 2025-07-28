import Conversation from 'App/Models/Conversation'
import Database from '@ioc:Adonis/Lucid/Database'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

interface ConversationPayload {
  session_id?: string
  question: string
}

export default class ConversationService {
  public async create(payload: ConversationPayload) {
    const trx = await Database.transaction()
    try {
      let sessionId = payload.session_id
      let conversation: Conversation | null = null

      if (sessionId) {
        conversation = await Conversation.query({ client: trx })
          .where('session_id', sessionId)
          .first()
      }

      if (!conversation) {
        sessionId = uuidv4()
        conversation = new Conversation()
        conversation.useTransaction(trx)
        conversation.sessionId = sessionId
        await conversation.save()
      }

      await conversation.related('messages').create(
        {
          senderType: 'user',
          message: payload.question,
        },
        { client: trx }
      )

      const externalApiUrl =
        'https://api.majadigidev.jatimprov.go.id/api/external/chatbot/send-message'

      const apiResponse = await axios.post(externalApiUrl, {
        session_id: sessionId,
        message: payload.question,
      })

      const botResponse = apiResponse.data?.data?.message || 'Tidak ada respons dari bot.'
      const storeResponseToDb = apiResponse.data.data.message[0].text

      await conversation.related('messages').create(
        {
          senderType: 'bot',
          message: storeResponseToDb,
        },
        { client: trx }
      )

      conversation.lastMessage = storeResponseToDb
      await conversation.save()

      await trx.commit()

      return {
        session_id: sessionId,
        reply: botResponse,
      }
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }
}
