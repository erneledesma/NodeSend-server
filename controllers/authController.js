const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
require('dotenv').config({path: 'variables.env'})
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

exports.autenticarUsuario = async (req, res, next) => {

    // revisar si hay errores

     const errores = validationResult(req);
     // si los errores no estan vacios
     if(!errores.isEmpty()) {
         return res.status(400).json({errores: errores.array()})
 
     }

    // Buscar el usuario para ver si esta registrado
    const  { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });

  //  console.log(usuario)

    if(!usuario) {
        res.status(401).json( {mes: 'El usuario no existe'});
        return next()
    }

  
    // Verificar el password y autenticar usuario
    if(bcrypt.compareSync(password, usuario.password )) {
        // crear un JWT
        const token = jwt.sign({
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email

        }, process.env.SECRETA, {
            expiresIn: '8h'
        });
         res.json({token});


    } else {
        res.status(401).json({msg: 'El password es incorrecto'} );
        return next();
    }


}

exports.usuarioAutenticado =  (req, res, next) => {

    res.json({usuario: req.usuario})

}