import Route from "@ioc:Adonis/Core/Route";

Route.get("/", async () => {
  return { Satus: "Server berjalan dengan baik" };
});

Route.post("/questions", "ChatsController.store");

Route.get("/conversations", "ChatsController.index");

Route.get("/conversations/:id", "ChatsController.show");

Route.delete("/conversations/:id", "ChatsController.destroy");
