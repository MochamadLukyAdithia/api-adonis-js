import Conversation from "App/Models/Conversation";
import Database from "@ioc:Adonis/Lucid/Database";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

interface ConversationPayload {
  session_id?: string;
  question: string;
  additional_context?: string;
}
export default class ConversationService {
  /**
   * Membuat atau melanjutkan percakapan, menyimpan pesan, dan memanggil API eksternal.
   * @param payload Data yang berisi pertanyaan dan session_id opsional
   * @returns Objek yang berisi session_id dan balasan dari bot
   */
  public async create(payload: ConversationPayload) {
    const trx = await Database.transaction();

    try {
      const conversation = await Conversation.firstOrCreate(
        { sessionId: payload.session_id || uuidv4() },
        { sessionId: payload.session_id || uuidv4() },
        { client: trx }
      );

      const sessionId = conversation.sessionId;
      await conversation.related("messages").create(
        {
          senderType: "user",
          message: payload.question,
        },
        { client: trx }
      );

      const apiResponse = await axios.post(
        "https://api.majadigidev.jatimprov.go.id/api/external/chatbot/send-message",
        {
          question: payload.question,
          session_id: sessionId,
          additional_context: payload.additional_context || "",
        }
      );

      const messageArray = apiResponse.data?.data?.message || [];

      const botReply =
        messageArray
          .map((msg: any) => msg.text)
          .filter(Boolean)
          .join("\n\n")
          .trim() ||
        "Maaf, saya tidak dapat memproses permintaan Anda saat ini.";

      await conversation.related("messages").create(
        {
          senderType: "bot",
          message: botReply,
        },
        { client: trx }
      );

      conversation.lastMessage = botReply;
      await conversation.save();

      await trx.commit();

      return {
        session_id: sessionId,
        reply: botReply,
      };
    } catch (error) {
      await trx.rollback();

      console.error("Error in ConversationService.create:", error);
      throw new Error("Gagal memproses permintaan chatbot.");
    }
  }

  /**
   * Mengambil semua percakapan dengan paginasi.
   * @param page
   * @param perPage
   */
  public async readAll(page: number, perPage: number) {
    return await Conversation.query()
      .orderBy("updated_at", "desc")
      .paginate(page, perPage);
  }

  /**
   * Mengambil satu percakapan beserta semua pesannya berdasarkan ID.
   * @param id ID unik dari percakapan (UUID)
   */

  public async readById(id: string) {
    const conversation = await Conversation.query()
      .where("id", id)
      .preload("messages", (messagesQuery) => {
        messagesQuery.orderBy("created_at", "asc");
      })
      .firstOrFail();

    return conversation;
  }

  /**
   * Menghapus percakapan berdasarkan ID.
   * @param id ID unik dari percakapan (UUID)
   */
 public async delete(id: string) {
  try {
    const conversation = await Conversation.findOrFail(id);
    await conversation.delete();

    return {
      success: true,
      message: `Conversation dengan ID ${id} berhasil dihapus.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Gagal menghapus conversation: ${error.message}`,
    };
  }
}

}
