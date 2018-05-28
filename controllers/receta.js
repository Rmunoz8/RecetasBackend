'use strict'

let Receta = require('../models/receta');
let fs = require('fs');
let path = require('path');

function saveReceta(req, res){
    let params = req.body;
    console.log(`PARAMS -> ${params} `);
    
    let receta = new Receta();

    console.log(`Receta
    Dificultad -> ${params.dificultad}
    Nombre -> ${params.nombre}
    Pasos -> ${params.pasos}
    Usuario -> ${params.usuario} `);
    

    if(params.dificultad && params.nombre && params.pasos && params.usuario ){
        receta.dificultad = params.dificultad;
        receta.nombre = params.nombre;
        receta.pasos = params.pasos;
        receta.usuario = params.usuario;
        receta.nick = params.nick;

        console.log("Enviando datos");

        receta.save((err, recetaStored)=>{
            if(err) return res.status(500).send({message: 'Error al guardar la receta'});

            if(recetaStored){
                res.status(200).send({receta: recetaStored});
            }else{
                res.status(404).send({message:'No se ha registrado la receta'});
            }
        });
    }else{
        res.status(200).send({
            message: "Faltan datos"
        });
    }
}

function dameRecetas(req, res){

    Receta.find((err, receta)=>{
        if(err){
            return res.status(500).send(err);
        }else{
            return res.status(200).send(receta);
        }
    });

}

function getRecetasFollows(req, res){

    let user  = req.user;

}

function recetasUserId(req, res){
    let userId = req.params.id;

    Receta.find({'usuario':userId}, (err, recetas)=>{
        if(err) return res.status(500).send({message:"Error al buscar recetas", estado:'error'})

        if(!recetas) return res.status(200).send({message:'Este usuario no tiene recetas', estado:'nulo'})

        return res.status(200).send({
            recetas,
            message: 'Recetas encontradas del usuario',
            estado: 'correcto'
        })

    });

}

function dameRecetaById(req, res){

    let recetaId = req.params.id;
    Receta.findById(recetaId, (err, receta) => {
        if (err) {
            return res.status(500).send(err);
        } else {
            return res.status(200).send(receta);
        }
    });

}

function uploadImage(req, res) {
    let recetaId = req.params.id;

    if (req.files) {
        let file_path = req.files.image.path;
        let file_split = file_path.split('\\');
        let file_name = file_split[2];
        let ext_split = file_name.split('\.');
        let file_ext = ext_split[1];

        if (file_ext == `png` || file_ext == `jpg` || file_ext == `jpeg` || file_ext == `gif`) {
            // Actualizar documento de receta
            Receta.findByIdAndUpdate(recetaId, {
                img: file_name
            }, {
                new: true
            }, (err, recetaUpdate) => {
                if (err) return res.status(500).send({
                    message: `Error en la petición`
                });
                if (!recetaUpdate) return res.status(404).send({
                    message: `No se ha podido actualizadar la receta`
                });

                return res.status(200).send({
                    Receta: recetaUpdate
                });
            });
        } else {
            return removeFilesOfUploads(res, file_path, `La extensión no es válida`);
        }

    } else {
        return res.status(200).send({
            message: `No se han subido archivos`
        });
    }
}

function getImageFile(req, res) {
    let image_file = req.params.imageFile;
    let path_file = `./uploads/users/${image_file}`

    fs.exists(path_file, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(path_file));
        } else {
            res.status(200).send({
                message: `No existe la imagen`
            });
        }
    });

}

module.exports = {
    saveReceta,
    dameRecetas,
    dameRecetaById,
    recetasUserId,
    uploadImage,
    getImageFile
}
