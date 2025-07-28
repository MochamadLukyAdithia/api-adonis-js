import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostQuestionValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    session_id: schema.string.optional(),
    question: schema.string({}, [rules.minLength(1)]),
    additional_context: schema.string.optional({}, [rules.minLength(1)])
  })
  public messages = {

  }
}
