import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.post("/questions", "ConversationsController.create");
  Route.group(() => {
    Route.get("/conversations", "ConversationsController.readAll");
    Route.get("/conversations/:id", "ConversationsController.readById");
    Route.delete("/conversations/:id", "ConversationsController.delete");
  }).middleware('auth');
}).prefix("/api/v1");



