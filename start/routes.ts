import Route from "@ioc:Adonis/Core/Route";
import './routes/conversations'
import './routes/users'
import './routes/messages'

Route.get("/", async () => {
  return { Satus: "Server berjalan dengan baik" };
});

