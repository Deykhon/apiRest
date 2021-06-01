import { Request, Response} from "express"; //Request y response son metodos la express
import BusinessUser from "../businessController/BusinessUser";
import BusinessRoles from "../businessController/BusinessRoles";
import sha1 from "sha1";
import jsonwebtoken from "jsonwebtoken";
import { IUser } from "../models/Users";
import { IRoles } from "../models/Roles";

interface Icredentials {
    email: string;
    password: string;
}
class RoutesController{
    constructor(){
        
    }
    public async login(request: Request, response: Response){
        var credentials: Icredentials = request.body;
        if (credentials.email == undefined) {
            response.status(300).json({ serverResponse: "Es necesario el parametro email"});
            return;
        }
        if (credentials.password == undefined) {
            response.status(300).json({ serverResponse: "Es necesario el parametro password"});
            return;
        }
        credentials.password = sha1(credentials.password);
        const user: BusinessUser = new BusinessUser();
        let result: Array<IUser> = await user.readUsers(credentials, 0, 1);
        // si result es igual a uno es decir qe las credenciales son correctas y el usuario existe
        if (result.length == 1) {
            
            var loginUser: IUser = result[0];
            // la funcion sing es para firmar la credencial
            var token: string = jsonwebtoken.sign(
                { id: loginUser._id, email: loginUser }, "secret"
            );
            response.status(200).json({ 
                serverRsponse: { email: loginUser.email, username: loginUser.username, token }});
             return;
        }
        response.status(200).json({ serverResponse: "credenciales incorrectas" });
    }
    public async createUsers(request: Request, response: Response) {
    //  return response.status(200).json( {server: "Hola mundo soy sms de post"});
        var user: BusinessUser = new BusinessUser();
        var userData = request.body;    //  usuario cuando ingresa datos mediante request
        // para la fecha de registro, se asigna desde el sistema
        userData["registerdate"] = new Date();
        userData["password"] = sha1(userData["password"]);
        let result = await user.addUsers(userData);
        response.status(201).json({ serverResponse: result });
    }
    //  video 7
    public async getUsers(request: Request, response: Response) {
        //return response.status(200).json( {server: "Hola mundo soy sms de get"});
        var user: BusinessUser = new BusinessUser();
        const result:  Array<IUser> = await user.readUsers();
        response.status(200).json({ serverResponse: result });
    }
    public async updateUsers(request: Request, response: Response) {
        var user: BusinessUser = new BusinessUser();
        // para recuperar el id de la url(siempre viene como string)
        let id: string = request.params.id;
        var params = request.body;  // para recuperar los parametros
        var result = await user.updateUsers(id, params);
        response.status(200).json({ serverResponse: result });

    }
    public async removeUsers(request: Request, response: Response) {
        var user: BusinessUser = new BusinessUser();
        let id: string = request.params.id;
        let result = await user.deleteUsers(id);
        response.status(200).json({ serverResponse: result});
    }
    //  hasta aqui video 7
    // addRol añade un rol a un usuario en específico
    public async addRol(request: Request, response: Response){
        let idUs: string = request.params.id;
        let idRol = request.body.idRol;
        if (idUs == null && idRol == null) {
            response.status(300).json({ severResponse: "No se definió id de usuario ni id de rol" });
            return;
        }
        var user: BusinessUser = new BusinessUser();
        var result = await user.addRol(idUs, idRol);
        if(result == null){
            response.status(300).json({ serverResponse: "El rol o usuario no existe" });
        }
        response.status(200).json({ serverResponse: result });
    }
    //createRol para crear roles
    public async createRol(request: Request, response: Response) {
        let roles: BusinessRoles = new BusinessRoles();
        var rolesData: any = request.body;
        //var keys: Array<string> = Object.keys(rolesData);espara obtener los parametros del objeto
        let result = await roles.createRol(rolesData);
        if(result == null){
            response.status(300).json({ serverResponse: "El rol tiene parametros no válidos"});
            return;
        }
        response.status(201).json({ serverResponse: result });

    }
    // listar todos los roles
    public async listarRol(req: Request, response: Response){
        var rol: BusinessRoles = new BusinessRoles();
        const resul: Array<IRoles> = await rol.listarRoles();
        response.status(200).json({ serverResponse: resul });
    }
    public async removeRol(request: Request, response: Response){
        let roles: BusinessRoles = new BusinessRoles();
        let idRol: string = request.params.id;
        // ?id=13; request.query.id
        let result = await roles.deleteRol(idRol);
        response.status(201).json({ serverResponse: result});
    }
    public async removeUserRol(request: Request, response: Response){
        let roles: BusinessUser = new BusinessUser();
        let idUs: string = request.params.id;
        let idRol: string = request.body.idRol;
        let result = await roles.removeRol(idUs, idRol);
        response.status(201).json({ serverResponse: result});
    }

    /*public async isPrime(request: Request, response: Response){
        const data = request.body;          //reques.body es una peticion de tipo post. en body se almacena el post
        var number = Number(data.number);
        for(var i = 2; i < number / 2; i++){
            if(number % i == 0){
                return response.status(200).json( {number, msn: "no es primo"});
            }
        }
        return response.status(200).json( {number, msn: "Es primo"});

    }*/
}
export default RoutesController;
