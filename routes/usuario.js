'use strict'

let express = require('express');
let UsuarioController = require('../controllers/usuario');

let api = express.Router();
let md_auth = require('../middlewares/authenticated');

api.post(`/register`, UsuarioController.saveUsuario);
api.post(`/login`, UsuarioController.loginUsuraio);
api.get(`/user/:id`, md_auth.ensureAuth, UsuarioController.getUser);
api.get(`/users/:page?`, md_auth.ensureAuth, UsuarioController.getUsers);
api.put(`/updateUser/:id`, md_auth.ensureAuth, UsuarioController.updateUser);

module.exports = api;