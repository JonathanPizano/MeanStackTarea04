'use stict'

// import de express
var express = require('express')

// import del controlador
var citiesController = require('../controllers/cities')

//Instalamos un objeto Router
var apiCi = express.Router();

// Recurso get con url 
apiCi.get('/city/:id?', citiesController.getCity);
apiCi.get('/cities/', citiesController.getCities);
apiCi.post('/city', citiesController.saveCity);
apiCi.put('/city/:id?', citiesController.updateCity);
apiCi.delete('/city/:id?', citiesController.deleteCity);


//Para utilizarlo
module.exports = apiCi;