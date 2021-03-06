//import { Schema, Document } from "mongoose";  //CORRECION
import mongoose, { Schema, Document } from "mongoose";
import RolesModel, { IRoles } from "./Roles";
//import app from "../../../app"; //CORRECCION video 7 min 1:21
// schema o esquema son objetos cerrados lo cual no se puede ingreas a sus variables
// se usa una interfaz para poder ingresar a las variables de los objetos
export interface ISimpleUser {
    username: string;
    email: string;
    registerdate: Date;
    password: string;
    roles?: Array<IRoles>;
    uriavatar?: string;
    pathavatar?: string;
}
export interface IUser extends Document {
    username: string;
    email: string;
    registerdate: Date;
    password: string;
    roles: Array<IRoles>;
    uriavatar?: string;
    pathavatar?: string;

}
// contruccion de un esquema, susa el driver schema para poder leer la base de datos
// las clases, funciones, variables const no son exportadas
const userSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, inique: true },
    registerdate: { type: Date, required: true },
    password: { type: String, required:true, unique: true },
    roles: { type: Array }, //{ type: [RolesModel.schema] }
    uriavatar: { type: String },
    pathavatar: { type: String },
});
// exporta el modelo esquema userSchema
export default mongoose.model<IUser>("User", userSchema);  //RolesModel
//export default app.mongooseClient.model<IUser>("User", userSchema); //CORECCION

