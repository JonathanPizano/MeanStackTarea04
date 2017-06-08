'use stict'

// import de express
var express = require('express')

// import del controlador
var autoController = require('../controllers/auto')

//Instalamos un objeto Router
var api = express.Router();

// Recurso get con url 
api.get('/auto/:id?', autoController.getAuto);
api.get('/autos/', autoController.getAutos);
api.post('/auto', autoController.saveAuto);
api.put('/auto/:id?', autoController.updateAuto);
api.delete('/auto/:id?', autoController.deleteAuto);

//Para utilizarlo
module.exports = api;