import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post("/messages/:id", "MessagesController.delete");
}).prefix("/api/v1");
