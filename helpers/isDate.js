const moment = require('moment');

//funcion para validar fecha
const isDate = (value) => {

    //verificar si el value existe, si no existe , retorna false
    //Si regresa false el campo no es correcto
    if( !value ) {
        return false ;
    }

    //Funcion a ocupar directameente de moment 
    const fecha = moment( value ) ;
    if(fecha.isValid()) {
        return true;
    }else {
        return false;
    }
};

module.exports = {
    isDate
};