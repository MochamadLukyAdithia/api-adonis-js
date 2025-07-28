import Route from "@ioc:Adonis/Core/Route";
import './routes/conversations'

Route.get("/", async () => {
  return { Satus: "Server berjalan dengan baik" };
});

