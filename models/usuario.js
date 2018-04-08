'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UsuarioSchema = Schema({
    nombre: String,
    apellido: String,
    nick: String,
    email: String,
    password: String
});

module.exports = mongoose.model('Usuario', UsuarioSchema);