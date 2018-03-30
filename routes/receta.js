'use strict'

let express = require('express');
let RecetaController = require('../controllers/receta');

let api = express.Router();

api.get('/home', RecetaController.home);
api.get('/pruebas', RecetaController.pruebas);
api.post('/crearReceta', RecetaController.saveReceta);
api.get('/dameRecetas', RecetaController.dameRecetas);
api.get('/dameRecetaById/:id', RecetaController.dameRecetaById);

module.exports = api;
