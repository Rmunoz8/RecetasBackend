'use strict'

let jwt = require('jwt-simple');
let moment = require('moment');
let secret = `proyecto_final_curso`;

exports.ensureAuth = (req, res, next) => {
    let payload;
    if (!req.headers.authorization) {
        return res.status(403).send({ message: `La petición no tiene la cabecera de autentificación` });
    }

    let token = req.headers.authorization.replace(/['"]+/g, '');
    try {
        payload = jwt.decode(token, secret);
        if (payload.exp <= moment.unix()) {
            return res.status(401).send({
                message: `El token ha expirado`
            });
        }

    } catch (ex) {
        return res.status(404).send({
            message: `El token no es válido`
        });
    }
    req.user = payload;
    next();
}