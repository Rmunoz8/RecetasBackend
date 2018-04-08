'use strict'

let express = require('express');
let UsuarioController = require('../controllers/usuario');

let api = express.Router();

api.post(`/register`, UsuarioController.saveUsuario);
api.post(`/login`, UsuarioController.loginUsuraio);

module.exports = api;