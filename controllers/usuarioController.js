
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');



exports.nuevoUsuario = async (req, res ) => {

    // Mostrar los mensaje de error de express-validator
    const errores = validationResult(req);
    // si los errores no estan vacios
    if(!errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})

    }
    
    // verificar si el usuario este registrado
    const { email, password } = req.body;
    
    let usuario = await Usuario.findOne({ email })
    
    if( usuario ) {
        return res.status(400).json( { msg: ' El usuario ya está registrado'});
    }
    //console.log(req.body)

    // Crear un nuevo usuario
    usuario =  new Usuario(req.body);

     // Hashear el password
     const salt = await bcrypt.genSalt(10);
     usuario.password = await bcrypt.hash(password, salt);

     try {
         await usuario.save();
     
         res.json({msg: 'Usuario creado correctamente'})
         
     } catch (error) {
         console.log(error)
         
     }

}   