'use strict'

//Importamos app.js
var app = require ('./app');
var database = require('./database');

//Puerto de variable de entorno de produccion o uno especificado
var port = process.env.PORT || 7070

app.listen(7070, function(){
    console.log('Applicacion corriendo en puerto: ' + port)
});