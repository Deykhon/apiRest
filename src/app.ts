//codigo inicial para la aplicacion
import express, {Express} from "express";// lo del corchetes es el tipo de dato (Express) tambien se pude especificar lo q se va a importar
import * as bodyParser from "body-parser" ;//bodyParse hace que todos los datos que viajan por http(binario) lo combierta a legible
import UserModules from "./modules/usermodule/init";
import mongoose, { Mongoose } from "mongoose";
class App{

    public app: Express = express();
    public  mongooseClient: Mongoose;  //variable universal para usar la base de datos
    constructor(){
        this.configuration();
        this.connectDatabase();
        this.initApp();
    }
    public connectDatabase(){
        console.log("data okey");
        // process.env es paraingresar alas variables de entorno del contenedor mongo
        let host: string = "mongodb://172.18.0.2:27017"; // || process.env.DBHOST
        let database: string = process.env.DATABASE || "seminario";
        let connectionString: string = `${host}/${database}`;
        mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true});
        mongoose.connection.on("error", err => {
            console.log("Connection Fail");
            console.log(err);
        });
        mongoose.connection.on("open", () => {
            console.log("Datbase connection success !!!a!!");
        });
        this.mongooseClient = mongoose;
    }
    public configuration(){
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false})); // usa la codificacion de url mas corta
        
    }
    public initApp(){
        console.log("LOADING MODULES");
        const userModule = new UserModules("/api", this.app );
    }
}
export default new App();   //el new inicializa la instancia App