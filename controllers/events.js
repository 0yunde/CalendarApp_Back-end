/* 
    Rutas de eventos / events
    host + /api/events
*/
const { response } = require('express')
const Event = require('../models/EventModel')

//respuesta
const getEvents = async(req, res = response ) => {

    const event = await Event.find().populate('user' , 'name');
    console.log(req.body);
    res.status(200).json(
        {
            ok:true,
            msg: 'obtener eventos',
            event
        }
    )

}

const createEvent = async( req , res = response ) => {

    const event = new Event( req.body );

    try {

        event.user = req.id ;
        const eventSave = await event.save();

        res.json({
            ok: true,
            event: eventSave, 
        });


    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }

}

const updateEvent = async(req, res = response ) => {

    const eventId = req.params.id;
    const id = req.id;

    try {

        const event = await Event.findById( eventId );
        

        //Verificar evento existente por el id
        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        //Verificar que la persona que edite el eveento es la misma persona que lo creo
        //si no es la misma persona no lo permita
        if (event.user.toString() !== id) {
            return res.status(401).json({
                ok: false,
                msg: 'No puede editar evento no propio'
            })
        }


        const newEvent = {
            ...req.body,
            user: id
        }

        const eventUpdate = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});
        
        res.json({
            ok:true ,
            event: eventUpdate
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const deleteEvent = async(req, res = response ) => {
    const eventId = req.params.id;
    const id = req.id;

    try {

        const event = await Event.findById( eventId );
        

        //Verificar evento existente por el id
        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            })
        }

        //Verificar que la persona que elimine el eveento es la misma persona que lo creo
        //si no es la misma persona no lo permita
        if (event.user.toString() !== id) {
            return res.status(401).json({
                ok: false,
                msg: 'No puede eliminar evento no propio'
            })
        }

        
        await Event.findByIdAndDelete(eventId);
        
        res.json({
            ok:true,
            msg: "Evento eliminado con exito"
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}