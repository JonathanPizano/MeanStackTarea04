'use stict'

// import de express
var express = require('express')

// import del controlador
var languagesController = require('../controllers/lang')

//Instalamos un objeto Router
var apiLa = express.Router();

// Recurso get con url 
apiLa.get('/lang/:id?', languagesController.getLanguage);
apiLa.get('/langs/', languagesController.getLanguages);
apiLa.post('/lang', languagesController.saveLanguage);
apiLa.put('/lang/:id?', languagesController.updateLanguage);
apiLa.delete('/lang/:id?', languagesController.deleteLanguage);

//Para utilizarlo
module.exports = apiLa;