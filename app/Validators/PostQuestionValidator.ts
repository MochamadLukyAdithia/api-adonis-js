import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostQuestionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    question: schema.string({ trim: true }, [rules.maxLength(1000)]),
    additional_context: schema.string.optional({trim: true}, [rules.minLength(1)]),
    session_id: schema.string.optional({ trim: true }, [rules.uuid()]) 
  })

  public messages = {
    'question.required': 'Pertanyaan tidak boleh kosong.',
    'question.maxLength': 'Pertanyaan tidak boleh lebih dari 1000 karakter.',
    'session_id.uuid': 'Session ID harus berupa UUID yang valid.'
  }
}