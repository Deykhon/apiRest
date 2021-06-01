import UserModule from "../init";
import UsersModel, { IUser } from "../models/Users";
import RolesModel, { IRoles }from "../models/Roles";
class BusinessUser {
    constructor(){


    }
    // Overload o sobrecarga de funciones(cuando varias funciones tienen el mismo nombre)
    // pero tienen que ser diferente el numero de parámetros que recibe o el tipo
    public async readUsers(): Promise<Array<IUser>>;
    public async readUsers(id: string): Promise<IUser>;
    public async readUsers(query: any, skip: number, limit: number): Promise<Array<IUser>>;
    // el signo ? significa que elparametro puede contener datos o no
    public async readUsers(params1?: string | any, params2?: number, params3?: number): Promise<Array<IUser> | IUser> {
        // find, funcion de consulta, para buscar un usuario
        // typof indica,que tipo de datos q se esta usando
        if (params1 && typeof params2 == "string") {
            var result: IUser = await UsersModel.findOne({_id: params1});
            return result;
        } else if(params1){
            // skip indica elsalto que se hará al consultar la base de datos
            let skip = params2? params2: 0; 
            // si params2? existe se le asigna params2, caso contrario se asigna 0
            let limit = params3? params3: 1;
            // el limit indica el limite de muestra q dará desde la basedatos
            let listUser: Array<IUser> = await UsersModel.find(params1).skip(skip).limit(limit);
            return listUser;
        } else {
            let listUser: Array<IUser> = await UsersModel.find();
            return listUser;
        }
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
