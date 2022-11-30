//importacion
const express = require("express");
const { dbConnection } = require("./database/config");
require("dotenv").config();
const cors = require("cors");
//Crear servidor de expres
const app = express();

const logger = require("./helpers/Logger");

//Directorio Publico
app.use(express.static("public"));

//base de datos
dbConnection();

//CORS configuracion basica
app.use(cors());


//Lectura y parseo del body
app.use(express.json());


//Logger imprimir en pantalla el consumo de la api 
app.use( logger );


//Rutas donde establecere en los endpoints 
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


//Escuchar peticiones y el puerto que se abrira
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});