import UserModule from "../init";
import UsersModel, { IUser } from "../models/Users";
import RolesModel, { IRoles }from "../models/Roles";
class BusinessUser {
    constructor(){


    }
    //  se crean todas las funciones que se puede hacer con el esquema Users
    //  CRUD video 7
    //  promesa o pausa(async, await) hace que se espere el eventloop (de js)
    //  para recuperar los datos que vienen desde otro server(save.then  otra manera de recuperar)
    public async addUsers(user: IUser){
        try{
            let userDb = new UsersModel(user);
            let result = await userDb.save();   //  save,funcion para guardar un esquema
            return result;    
        } catch (err){
            return err;
        }
        
    }
    public async readUsers(){
        // find, funcion de consulta, para buscar un usuario
        let listUser: Array<IUser> =  await UsersModel.find();
        return listUser;
    }
    public async updateUsers(id: string, user: any){
        // _id: id hace q el id que viene por parametro sea igual al de la base de datos
        // $set hace que se puedad hacer actualizaciones en user
        let result = await UsersModel.update({ _id: id }, { $set: user });
        return result;
    }
    public async deleteUsers(id: string){
        let result = await UsersModel.remove({ _id: id });
        return result;
    }
    // hasta aqui video 7
    // metodo para añadir un rol a un usuario en específico
    public async addRol(idUs: string, idRol: string) {
        let user = await UsersModel.findOne({ _id: idUs });
        if (user != null){
            var rol = await RolesModel.findOne({ _id: idRol });
            if (rol != null) {
                user.roles.push(rol);
                return await user.save();
            }
            return null;
        }
        return null;
    }
    public async removeRol(idUs: string, idRol: string) {
        let user = await UsersModel.findOne({ _id: idUs });
        var rol = await RolesModel.findOne({ _id: idRol });
        if(user != null && rol != null){
            let newroles: Array<IRoles> = user.roles.filter((item: IRoles) => {
                if(item.name == rol.name){
                    // se hace comparacion por name y no por id xq id es asignado en la base de datos
                    // busca en atributo name en roles de user y compara
                    return false;
                }
                return true;
            });
            user.roles = newroles;
            try{
                return await user.save();
            } catch (err) {
                return err;
            };
        }
        return null;
    }
}
export default BusinessUser;
