import { Request, Response} from "express"; //Request y response son metodos la express
import BusinessUser from "../businessController/BusinessUser";
import sha1 from "sha1";
import { IUser } from "../models/Users";
class RoutesController{
    constructor(){
        
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

    public async isPrime(request: Request, response: Response){
        const data = request.body;          //reques.body es una peticion de tipo post. en body se almacena el post
        var number = Number(data.number);
        for(var i = 2; i < number / 2; i++){
            if(number % i == 0){
                return response.status(200).json( {number, msn: "no es primo"});
            }
        }
        return response.status(200).json( {number, msn: "Es primo"});

    }
}
export default RoutesController;
