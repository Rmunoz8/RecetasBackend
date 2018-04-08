'use strict'

let bcrypt = require('bcrypt-nodejs');
let Usuario = require('../models/usuario');

function saveUsuario(req, res){
    let params = req.body;
    let usuario = new Usuario();

    if(params.nombre && params.apellido && params.nick && params.email && params.password){
        usuario.nombre = params.nombre;
        usuario.apellido = params.apellido;
        usuario.nick = params.nick;
        usuario.email = params.email;

        // Controlar usuarios duplicados
        Usuario.find({$or:[
            {email:usuario.email.toLowerCase()},
            {nick:usuario.nick.toLowerCase()}
        ]}).exec((err,users)=>{
            if (err) return res.status(500).send({ message: 'Error en la petición de los usuarios' });
            if(users && users.length >= 1){
                return res.status(200).send({message: "El usuario ya existe"});
            }else{

                // Cifrar la contraseña
                bcrypt.hash(params.password, null, null, (err, hash)=>{
                    usuario.password = hash;

                    // Guardar los datos
                    usuario.save((err, usuarioStored)=>{
                        if(err) return res.status(500).send({message:"Error al guardar el usuario"});
                        if(usuarioStored){
                            res.status(200).send({usuarioStored});
                        }else{
                            res.status(404).send({message:"No se ha registrado el usuario"});
                        }
                    })

                });

            }
        });

    } else {
        res.status(200).send({
            message: `Envía todos los campos necesarios`
        });
    }

}

function loginUsuraio(req, res){
    let params = req.body;
     
    let email = params.email;
    let password = params.password;

    Usuario.findOne({email:email}, (err, usuario)=>{
        if(err) return res.status(500).send({message: "Error en la petición"});

        if(usuario){
            bcrypt.compare(password, usuario.password, (err, check)=>{
                if(check){
                    // Devolver datos del usuario
                    return res.status(200).send({usuario});
                }else{
                    return res.status(404).send({message: "El usuario no se ha podido identificar"});
                }
            });
        }else{
            return res.status(404).send({message: "No se identificó al usuario"});
        }

    });

}

module.exports = {
    saveUsuario,
    loginUsuraio
}