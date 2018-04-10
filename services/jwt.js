'use strict'

let jwt = require('jwt-simple');
let moment = require('moment');
let secret = `proyecto_final_curso`;

exports.createToken = (usuario)=>{
    let payload = {
        sub: usuario._id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        nick: usuario.nick,
        email: usuario.email,
        rol: usuario.rol,
        image: usuario.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret);

}