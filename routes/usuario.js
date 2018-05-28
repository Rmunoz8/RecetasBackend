'use strict'

let express = require('express');
let UsuarioController = require('../controllers/usuario');

let api = express.Router();
let md_auth = require('../middlewares/authenticated');

let multipart = require('connect-multiparty');
let md_upload = multipart({uploadDir: './uploads/users'})

api.get(`/user/:id`, UsuarioController.getUser);
api.post(`/userUpdate/:id`, UsuarioController.updateUser);
api.post(`/user`, UsuarioController.saveUsuario);

api.post(`/login`, UsuarioController.loginUsuraio);
api.get(`/users/:page?`, md_auth.ensureAuth, UsuarioController.getUsers);
api.post('/userImage/:id', md_upload, UsuarioController.uploadImage);
api.get('/userImageFile/:imageFile', UsuarioController.getImageFile);
api.get('/allUsers', UsuarioController.getAllUsers);

module.exports = api;