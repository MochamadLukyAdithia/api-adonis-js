import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Env from "@ioc:Adonis/Core/Env";

export default class BasicAuth {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    const authHeader = ctx.request.header("authorization") ?? "";

    if (!authHeader.startsWith("Basic ")) {
      ctx.response.unauthorized({ status: 401, message: "unauthorized" });
      return;
    }
    const token = authHeader.substring(6);
    if (token !== Env.get("APP_SECRET")) {
      ctx.response.unauthorized({ status: 401, message: "unauthorized" });
      return;
    }
    await next();
  }
}
