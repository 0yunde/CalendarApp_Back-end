const { response } = require('express')
const bcrypt = require('bcryptjs')
const User =  require('../models/UserModel')
const { generateJWT } = require('../helpers/jwt')

const createUser = async(req, res = response) => {
    
    const { name, email, password } = req.body;

    try {

        let user = await User.findOne({email})

        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese correo'
            })
        }
        
        //requerir el cuerpo de user 
        user = new User(req.body);

        //Generar JWT
        const token = await generateJWT(user.id , user.name)

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //Guardado
        await user.save();

        //Lo que responde 
        res.status(201).json({
            ok:true,
            id: user.id,
            name:user.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor comunicarse con administración'
        })
    }

}


const loginUser = async (req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con esas credenciales, email'
            })
        }

        //Confirmar las contraseñas 
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta'
            })
        }

        //Generar JWT
        const token = await generateJWT(user.id , user.name)

        //En caso de ingreso exitoso
        res.json({
            ok: true,
            id: user.id,
            name: user.name,
            token

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor comunicarse con administración'
        })
    }
}

const revalidateToken = async(req, res = response) => {

    const { id, name } = req;
    const token = await generateJWT(id, name)
    
    res.json({
        ok:true,
        token
    })
}

module.exports = {
    createUser, 
    loginUser,
    revalidateToken
}