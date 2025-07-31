import Conversation from 'App/Models/Conversation'

export default class MessageService {

   /**
     * Menghapus percakapan berdasarkan ID.
     * @param id ID unik dari percakapan (UUID)
     */
    public async delete(id: string) {
      const conversation = await Conversation.findOrFail(id);
      await conversation.delete();
    }
}
