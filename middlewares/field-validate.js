const { response } = require('express')
const { validationResult } = require('express-validator');

const validateField = (req, res = response , next) => {

    //Manejo de todos los errores respecto a campos solictados 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false, 
            errors : errors.mapped()
        });
    }

    next();
}

module.exports = {
    validateField
}