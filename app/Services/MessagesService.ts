import Conversation from 'App/Models/Conversation'

export default class MessageService {
  public async readAll(page: number, perPage: number) {
    return await Conversation
      .query()
      .orderBy('updated_at', 'desc')
      .paginate(page, perPage)
  }

  public async readById(id: number) {
    const conversation = await Conversation.findOrFail(id)
    const messages = await conversation.related('messages').query().orderBy('created_at', 'asc')
    return { conversation, messages }
  }

  public async delete(id: number) {
    const conversation = await Conversation.findOrFail(id)
    await conversation.delete()
  }
}
