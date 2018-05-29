'use strict'

let express = require('express');
let RecetaController = require('../controllers/receta');

let api = express.Router();

let multipart = require('connect-multiparty');
let md_upload = multipart({
    uploadDir: './uploads/users'
})

api.post('/crearReceta', RecetaController.saveReceta);
api.get('/dameRecetas', RecetaController.dameRecetas);
api.get('/dameRecetaById/:id', RecetaController.dameRecetaById);
api.get('/recetasUsuario/:id', RecetaController.recetasUserId);
api.post('/recetaImage/:id', md_upload, RecetaController.uploadImage);
api.post('/upImageReceta', md_upload, RecetaController.uploadImgReceta);
api.get('/recetaImageFile/:imageFile', RecetaController.getImageFile);

module.exports = api;
