//importacion
const express = require("express");

//Conexion a base de  datos
const { dbConnection } = require("./database/config");

//Variables de entorno 
require("dotenv").config();

//Seguridad de api
const cors = require("cors");

//Crear servidor de expres
const app = express();

//Logger imprimir en pantalla el consumo de la api
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


//Para ubicarnos siempre en el index carpeta publica en caso de que no
//este en las rutas establecidas
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})


//Escuchar peticiones y el puerto que se abrira
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});