// es necesario saber que un middleware no puede trabajar como una clase sino como una funcion
import jsonwebtoken from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import BusinessUser from "./businessController/BusinessUser";
import { IUser } from "./models/Users";
import { IRoles } from "./models/Roles";
var jsonewebtokenSecurity = (request: Request, response: Response, next: NextFunction) => {
    var token: string = request.headers["authorization"];// en http el token viene en el header
    if(!token) {
        response.status(300).json({ serverResponse: "no tiene acceso a este endpoint" });
        return;
    }
    // la funcion verify permite verificar el token, la llave de cifrado "secret"
    jsonwebtoken.verify(token, "secret", async(err, success: any) => {
        if(err) {

            response.status(300).json({ serverResponse: "Token no valido" + err.message });
            return;
        }
        var id = success.id;
        var user: BusinessUser = new BusinessUser();
        var userdata: IUser = await user.readUsers(id);
        if (!userdata) {
            response.status(300).json({ serverResponse: "no valido " });
            return;
        }
        var roles: Array<IRoles> = userdata.roles;
        for (var i = 0; 1 < roles.length; i++) {  
            // include es un metodo q permite comparar lo que viene en la url con el urn de los roles
            if (
            request.url.toLocaleLowerCase().includes(roles[i].urn.toLowerCase()) && 
            request.method.toLowerCase().includes(roles[i].method.toLowerCase())) {
                next();  // en caso q cumpla lo de for la damos acceso con next
                return;
            }
        }
        response.status(300).json({ serverResponse: "Usted no cuenta con los permisos" });
    });
}
export default jsonewebtokenSecurity;