import  RoutesController from "./routeController/RoutesController";
import jsonwebtokenSecurty from "./middleware";
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
        // -------------------USERS RouteS---------------------------------------------------

        app.route(`${this.routeparent}/login`).post(this.routesController.login);
        //creara un usuario nuevo
        app.route(`${this.routeparent}/users`).post(this.routesController.createUsers);
        // leera la iniformacion de un conjunto de usuarios
        app.route(`${this.routeparent}/users`).get(jsonwebtokenSecurty, this.routesController.getUsers);
        //app.route(this.routeparent + "/users").get(this.routesController.getUsers);
        app.route(`${this.routeparent}/users/:id`).put(this.routesController.updateUsers);
        app.route(`${this.routeparent}/users/:id`).delete(this.routesController.removeUsers);
        app.route(`${this.routeparent}/addrol/:id`).put(this.routesController.addRol);
        app.route(`${this.routeparent}/removerol/:id`).put(this.routesController.removeUserRol);
        // -------------------------------ROLES ROUTES--------------------------------------

        app.route(`${this.routeparent}/roles`).post(this.routesController.createRol);
        app.route(`${this.routeparent}/roles`).get(this.routesController.listarRol);
        app.route(`${this.routeparent}/roles/:id`).delete(this.routesController.removeRol);

        // servicio para si un numero es primo
        //app.route(`${this.routeparent}/isPrime`).post(this.routesController.isPrime);
    }
}
export default Routes;