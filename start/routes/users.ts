import Route from '@ioc:Adonis/Core/Route'


Route.group(()=>{
    Route.post("/users/login", "UsersController.login")
    Route.post("/users/register", "UsersController.register")
}).prefix("/api/v1")