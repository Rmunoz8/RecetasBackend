'use strict'

let bcrypt = require('bcrypt-nodejs');
let mongoosePaginate = require('mongoose-pagination');
let jwt = require('../services/jwt');

let Usuario = require('../models/usuario');

// Registro de usuario
function saveUsuario(req, res){
    let params = req.body;
    let usuario = new Usuario();

    if(params.nombre && params.apellido && params.nick && params.email && params.password){
        usuario.nombre = params.nombre;
        usuario.apellido = params.apellido;
        usuario.nick = params.nick;
        usuario.email = params.email;
        usuario.rol = 'ROL';
        usuario.image = null;

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
// Login de usuarios
function loginUsuraio(req, res){
    let params = req.body;
     
    let email = params.email;
    let password = params.password;

    Usuario.findOne({email:email}, (err, usuario)=>{
        if(err) return res.status(500).send({message: "Error en la petición"});

        if(usuario){
            bcrypt.compare(password, usuario.password, (err, check)=>{
                if(check){

                    if(params.gettoken){
                        // Generar y Devolver token
                        return res.status(200).send({
                            token: jwt.createToken(usuario) //Genera un token con los datos del usuario 
                        });
                    }else{
                        // Devolver datos del usuario
                        return res.status(200).send({ usuario });
                    }
                }else{
                    return res.status(404).send({message: "El usuario no se ha podido identificar"});
                }
            });
        }else{
            return res.status(404).send({message: "No se identificó al usuario"});
        }

    });

}
// Conseguir datos de un usuario
function getUser(req, res){
    let usuarioId = req.params.id;
    
    Usuario.findById(usuarioId, (err, usuario)=>{
        if (err) return res.status(500).send({ message: `Error en la petición` });

        if (!usuario) return res.status(404).send({ message: `El usuario no existe` });

        return res.status(200).send({ usuario });
    });

}
// Devolver listado de usuarios paginados
function getUsers(req, res){
    let page = 1;
    if(req.params.page){
        page = req.params.page;
    }

    let itemsPerPage = 5;

    Usuario.find().sort(`_id`).paginate(page, itemsPerPage, (err, usuario, total)=>{
        if (err) return res.status(500).send({ message: `Error en la petición` });

        if (!usuario) return res.status(404).send({ message: `No hay usuarios disponibles` });

        return res.status(200).send({
            usuario,
            total,
            pages: Math.ceil(total / itemsPerPage)
        });
    });

}
// Edicion de datos usuario
function updateUser(req, res){
    let userId = req.params.id;
    let update = req.body;

    delete update.password;

    if(userId != req.user.sub){
        return res.status(500).send({ message: `No tienes permiso para actualizar los datos del usuario` });
    }

    Usuario.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdate)=>{
        if (err) return res.status(500).send({ message: `Error en la petición` });
        if (!userUpdate) return res.status(404).send({ message: `No se ha podido actualizadar el usuario` });

        return res.status(200).send({ usuario: userUpdate });
    });


}
module.exports = {
    saveUsuario,
    loginUsuraio,
    getUser,
    getUsers,
    updateUser
}