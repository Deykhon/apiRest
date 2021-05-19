import  RoutesController from "./routeController/RoutesController";
import  { Express } from "express";
class Routes{
    private routesController: RoutesController;
    private routeparent: string;  //para que aparezca api en la url .....
    constructor(routeparent: string, app: Express){
        this.routesController = new RoutesController();
        //app.use(routeparent, app);
        this.routeparent = routeparent;
        this.configureRoutes(app);
    }
    private configureRoutes(app: Express){
        //creara un usuario nuevo
        app.route(`${this.routeparent}/users`).post(this.routesController.createUsers);
        // leera la iniformacion de un conjunto de usuarios
        app.route(`${this.routeparent}/users`).get(this.routesController.getUsers);
        //app.route(this.routeparent + "/users").get(this.routesController.getUsers);
        app.route(`${this.routeparent}/users/:id`).put(this.routesController.updateUsers);
        app.route(`${this.routeparent}/users/:id`).delete(this.routesController.removeUsers);
        // servicio para si un numero es primo
        //app.route(`${this.routeparent}/isPrime`).post(this.routesController.isPrime);
    }
}
export default Routes;