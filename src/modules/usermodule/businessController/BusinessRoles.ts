import RolesModel, { IRoles } from "../models/Roles";
class BusinessRoles {
    costructor(){

    }
    public async createRol(rol: IRoles){
        try {
            let roles = new RolesModel(rol);
            let result = await roles.save();
            return result;

        } catch (error) {
            return null;
        }
    }
    public async listarRoles(){
        let listRoles: Array<IRoles> =  await RolesModel.find();
        return listRoles; 
    }
    public async deleteRol(id: string) {
        let result = await RolesModel.remove({ _id: id});
        ////----falta codigo para eliminar tambien de un usuario en especifico--------////
        return result;
    }
}
export default BusinessRoles;