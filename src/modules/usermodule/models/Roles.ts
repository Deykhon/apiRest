
import mongoose, { Document, Schema } from "mongoose";
//Roles.-accesos o servicios que tiene un usuario
//Endpoint.- servicio final
export interface IRoles extends Document{
    name: string;
    urn: string;
    method: string;
}
const RolesSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    urn: { type: String, required: true },
    method: { type: String, required: true },
});
export default mongoose.model<IRoles>("Roles",RolesSchema);