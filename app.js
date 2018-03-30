// Configuración global de Express
'use strict'

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// Cargar rutas
let receta_routes = require('./routes/receta');

// Middlewares ->  Metodo que se ejecuta antes de llegar a un controlador
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Cors

// Rutas
app.use('/api', receta_routes);

// Exportar

module.exports = app;
