// la primera ejecuvion de la aplicacion es este server.ts
 import app from "./app";
 const port = 8000;
 app.app.listen(port, () => {
     console.log("SEVER RUNNIG IN Port " + port);
 });
 export default app;