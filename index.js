//importaciones express
const express = require("express");

//Conexion de base de datos 
const { dbConnection } = require("./database/config");

//Variables de entorno
require("dotenv").config();

//Seguridad de api
const cors = require("cors");

//Servidor de expres
const app = express();

//Logger
const logger = require("./helpers/Logger");

//Swagger 
const swaggerUI =  require("swagger-ui-express");
const swaggerJsDoc =  require("swagger-jsdoc");


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

//Uso de Swagger
const path = require("path");
const swaggerSpect = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Api Evec-backend Victor Rojas",
      version: "1.0.0"
    },
    server: [
      {
        url: `http://localhost:${process.env.PORT}`
      }      
    ]
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`]
}

app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpect)));

//Escuchar peticiones y el puerto que se abrira
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});