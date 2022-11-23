const { Router } = require("express");
const { getEvents, createEvent, updateEvent, deleteEvent  } =  require("../controllers/events")
const { validateJWT } = require("../middlewares/validar-jwt");
const { check } = require('express-validator');
const { validateField } = require('../middlewares/field-validate');
const { isDate } = require('../helpers/isDate');



const router = Router();

//Validar cada uno de los eventos con eltoken
router.use(validateJWT)

//Obtener evento
router.get('/', getEvents);

//Crear nuevo  evento
router.post(
    '/',
     [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatorio').custom( isDate ),
        check('end', 'Fecha de finalizacion es obligatorio').custom( isDate ),
        
        validateField
     ], 
     createEvent 
);

//Actulizar evento
router.put(
   '/:id',
   [
      check('title', 'El titulo es obligatorio').not().isEmpty(),
      check('start', 'Fecha de inicio es obligatorio').custom( isDate ),
      check('end', 'Fecha de finalizacion es obligatorio').custom( isDate ),
      validateField
   ], 
   updateEvent );

//Eliminar evento
router.delete('/:id', deleteEvent );


module.exports = router;
