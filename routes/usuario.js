'use strict'

let express = require('express');
let UsuarioController = require('../controllers/usuario');

let api = express.Router();
let md_auth = require('../middlewares/authenticated');

let multipart = require('connect-multiparty');
let md_upload = multipart({uploadDir: './uploads/users'})

api.get(`/user/:id`, md_auth.ensureAuth, UsuarioController.getUser);
api.put(`/user/:id`, md_auth.ensureAuth, UsuarioController.updateUser);

api.post(`/register`, UsuarioController.saveUsuario);
api.post(`/login`, UsuarioController.loginUsuraio);
api.get(`/users/:page?`, md_auth.ensureAuth, UsuarioController.getUsers);
api.put('/userImage/:id', [md_auth.ensureAuth, md_upload], UsuarioController.uploadImage);
api.get('/userImage/:imageFile', UsuarioController.getImageFile);

module.exports = api;