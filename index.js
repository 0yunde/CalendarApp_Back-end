//importacion
const express = require('express');
const { dbConnection } =  require('./database/config');
require('dotenv').config();
const cors = require('cors')
//Crear servidor de expres
const app = express();

//Directorio Publico
app.use( express.static('public'))


//base de datos
dbConnection();


//CORS configuracion basica 
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//api
app.use('/api/auth', require('./routes/auth'))

//Escuchar peticiones y el puerto que se abrira
app.listen(process.env.PORT, () =>{
    console.log(`Servidor corriendo en puert ${process.env.PORT}`);
})