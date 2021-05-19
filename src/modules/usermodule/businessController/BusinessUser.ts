import UserModule from "../init";
import UsersModel, { IUser } from "../models/Users";
class BusinessUser {
    constructor(){


    }
    //  se crean todas las funciones que se puede hacer con el esquema Users
    //  CRUD video 7
    //  promesa o pausa(async, await) hace que se espere el eventloop (de js)
    //  para recuperar los datos que vienen desde otro server(save.then  otra manera de recuperar)
    public async addUsers(user: IUser){
        let userDb = new UsersModel(user);
        let result = await userDb.save();   //  save,funcion para guardar un esquema
        return result;
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

}
export default BusinessUser;
