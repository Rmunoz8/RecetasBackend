'use strict' //Permite usar las nuevas características de JS

let mongoose = require('mongoose'); //Cargamos módulo de mongoose
let app = require('./app'); //Cargamos la configuración de express
let port = 3800;

// Conexión DB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/recetadb')
        .then(() =>{
            console.log("Conexión a la base de datos realizada correctamente");

            // Crear servidor
            app.listen(port, ()=>{
                console.log("Servidor en funcionamiento en http://localhost:3800");
            })
        }).catch(err=>console.log(err));
