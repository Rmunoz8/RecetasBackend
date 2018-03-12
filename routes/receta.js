'use strict'

let express = require('express');
let RecetaController = require('../controllers/receta');

let api = express.Router();

api.get('/home', RecetaController.home);
api.get('/pruebas', RecetaController.pruebas);
api.post('/crearReceta', RecetaController.saveReceta);

module.exports = api;
