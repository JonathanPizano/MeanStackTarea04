// Importamos body parser

var bodyParser = require('body-parser')
var express = require('express')

// Declaramos la variable app como instancia de express
var app = express()

//Importamos las rutas del recurso para autos
var api = require('./routes/auto')
var apiCi = require('./routes/cities')
var apiCo = require('./routes/country')
var apiCu = require('./routes/curren')
var apiLa = require('./routes/lang')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(function(req , res, next){
    //Puede ser consumida desde cualquier lugar
    res.header('Access-Control-Allow-Origin','*');
    //Cabeceras permitidas
    res.header('Access-Control-Allow-Header','X-API-KEY,Origin,X-Requested-With,Content-Type,Accept,Access-Control-Request-Method');
    //Metodos Permitidos
    res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE');
    res.header('Allow','GET,POST,PUT,DELETE');
    next();
});

//URL de la api
app.use('/api',api);
app.use('/apiCi',apiCi);
app.use('/apiCo',apiCo);
app.use('/apiCu',apiCu);
app.use('/apiLa',apiLa);

//Para utilizarlo en otros ficheros e importar
module.exports = app;
