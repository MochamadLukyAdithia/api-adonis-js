import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
    Route.post("/questions", "ConversationsController.create");
  Route.group(() => {
    Route.get("/conversations", "MessagesController.readAll");
    Route.get("/conversations/:id", "MessagesController.readById");
    Route.delete("/conversations/:id", "MessagesController.delete");
  });
}).prefix("/api/v1");
