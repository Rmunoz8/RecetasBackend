'use strict'

let Receta = require('../models/receta');

function saveReceta(req, res){
    let params = req.body;
    let receta = new Receta();

    if(params.dificultad && params.img && params.nombre && params.pasos && params.usuario ){
        receta.dificultad = params.dificultad;
        receta.img = params.img;
        receta.nombre = params.nombre;
        receta.pasos = params.pasos;
        receta.usuario = params.usuario;

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

module.exports = {
    saveReceta,
    dameRecetas,
    dameRecetaById
}
