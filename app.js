// Configuración global de Express
'use strict'

let express = require('express');
let bodyParser = require('body-parser');
let app = express();


// Cargar rutas
let receta_routes = require('./routes/receta');
let usuario_routes = require(`./routes/usuario`);

// Middlewares ->  Metodo que se ejecuta antes de llegar a un controlador
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Rutas
app.use('/api', receta_routes);
app.use(`/api`, usuario_routes);

// Exportar

module.exports = app;
