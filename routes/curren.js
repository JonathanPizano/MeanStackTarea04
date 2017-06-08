'use stict'

// import de express
var express = require('express')

// import del controlador
var currenciesController = require('../controllers/curren')

//Instalamos un objeto Router
var apiCu = express.Router();

// Recurso get con url 
apiCu.get('/currency/:id?', currenciesController.getCurrency);
apiCu.get('/currencies/', currenciesController.getCurrencies);
apiCu.post('/currency', currenciesController.saveCurrency);
apiCu.put('/currency/:id?', currenciesController.updateCurrency);
apiCu.delete('/currency/:id?', currenciesController.deleteCurrency);

//Para utilizarlo
module.exports = apiCu;