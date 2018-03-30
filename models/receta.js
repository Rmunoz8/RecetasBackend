'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let recetaSchema = Schema({
    nombre: String,
    usuario: String,
    pasos: String,
    img: String,
    dificultad: String,
});

module.exports = mongoose.model('Receta', recetaSchema);
