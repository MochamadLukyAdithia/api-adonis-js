import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import PostQuestionValidator from "App/Validators/PostQuestionValidator";
import ConversationService from "App/Services/ConversationService";

export default class ConversationsController {
  private conversationService = new ConversationService();

  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(PostQuestionValidator);
      const result = await this.conversationService.create(payload);
      return response.ok(result);
    } catch (error) {
      console.error("ConversationController.create error:", error);
      return response.internalServerError({
        message: "Terjadi kesalahan saat memproses permintaan Anda.",
        error: error?.message || error,
      });
    }
  }

  public async readAll({ request, response }: HttpContextContract) {
    const { page = 1, perPage = 10 } = request.qs();
    const conversations = await this.conversationService.readAll(
      Number(page),
      Number(perPage)
    );
    return response.ok(conversations);
  }

  public async readById({ params, response }: HttpContextContract) {
    try {
      const data = await this.conversationService.readById(params.id);

      return response.ok({
        success: true,
        message: "Data percakapan berhasil ditemukan",
        data,
      });
    } catch (error) {
      if (error.code === "E_ROW_NOT_FOUND") {
        return response.status(404).json({
          success: false,
          message: "Percakapan tidak ditemukan",
        });
      }

      console.error("ReadById Error:", error);

      return response.status(500).json({
        success: false,
        message: "Terjadi kesalahan saat mengambil data percakapan",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  }

public async delete({ params, response }: HttpContextContract) {
  try {
    const result = await this.conversationService.delete(params.id)

    if (result.success) {
      return response.ok({
        success: true,
        message: 'Percakapan berhasil dihapus',
      })
    } else {
      return response.badRequest({
        success: false,
        message: result.message || 'Gagal menghapus percakapan',
      })
    }
  } catch (error) {
    if (error.code === 'E_ROW_NOT_FOUND') {
      return response.status(404).json({
        success: false,
        message: 'Percakapan tidak ditemukan',
      })
    }

    console.error('Delete Error:', error)

    return response.status(500).json({
      success: false,
      message: 'Terjadi kesalahan saat menghapus percakapan',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    })
  }
}

}
