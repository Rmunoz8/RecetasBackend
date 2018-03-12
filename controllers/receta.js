'use strict'

let Receta = require('../models/receta');

function home(req, res){
    res.status(200).send({
        message: "Hola mundo"
    });
};


function pruebas(req, res){
    res.status(200).send({
        message: "Prueba en el servidor"
    });
};

function saveReceta(req, res){
    let params = req.body;
    let receta = new Receta();

    if(params.nombre && params.usuario && params.pasos && params.img){
        receta.nombre = params.nombre;
        receta.usuario = params.usuario;
        receta.pasos = params.pasos;
        receta.img = params.img;

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

module.exports = {
    home,
    pruebas,
    saveReceta
}
