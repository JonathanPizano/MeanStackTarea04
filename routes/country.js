'use stict'

// import de express
var express = require('express')

// import del controlador
var countriesController = require('../controllers/country')

//Instalamos un objeto Router
var apiCo = express.Router();

// Recurso get con url 
apiCo.get('/country/:id?', countriesController.getCountry);
apiCo.get('/countries/', countriesController.getCountries);
apiCo.post('/country', countriesController.saveCountry);
apiCo.put('/country/:id?', countriesController.updateCountry);
apiCo.delete('/country/:id?', countriesController.deleteCountry);

//Para utilizarlo
module.exports = apiCo;