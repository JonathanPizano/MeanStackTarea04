'use strict'

// Definimos metodo para ser consumido
// desde el archivo a las rutas
var Currencies = require('../models/curren');
var mongoose = require('mongoose');


// Definicion de 5 metodos
function getCurrency(req, res){
   //Obtenemos el Id que llega
    var currencyId = req.params.id;
    // Verificamos si el parametro enviado es un ObjecId
    var idValido = mongoose.Types.ObjectId.isValid(currencyId);
    if(!idValido){
        //si no es valido mostramos un mensaje de id invalido
        res.status(409).send({message:'Id Invalido'});
    }else{
        //Buscaremos un documento por el Id proporcionado
        Currencies.findById(currencyId,function(err,curren){
            if(err){
                console.log(err)
                res.status(509).send({message:'Error al obtener la moneda. ', error:err});
            }else{
                if(!curren){
                    res.status(404).send({message:'No existe la moneda con el id proporcionado'});
                }else{
                    res.status(200).send({curren})
                }
            }
        });
    }
}

function getCurrencies(req, res){
    Currencies.find({}).sort('nombre').exec(function(err,currens){
        if(err){
            console.log(err)
            res.status(500).send({message:'Error al obtener las monedas', error:err});
        }else{
            res.status(200).send({currens})
        }
    });
}

function saveCurrency(req, res){
    var currency = new Currencies(req.body);

    currency.save(function(err,currencySaved){
        if(err){
            console.log(err)
            res.status(500).send({message:'Error al guardar la moneda', error:err});
        }else{
            res.status(200).send({saved:currencySaved})
        }
    });
};

function updateCurrency(req, res){
    //obtenemos el id que llega como parametro
    var currencyId = req.params.id;
    //verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(currencyId);
    if(!idValido){
        //Si no es valido mostramos un mensaje de Id invalido
        res.status(409).send({message:'Id Invalido'});
    }else{
        //utilizamos la función findByAnUpdate, busca un doc por id y lo actualiza
        Currencies.findByIdAndUpdate(currencyId, req.body, function(err, currenUpdate){
            if(err){
                console.log(err)
                res.status(500).send({message:'Error al actualizar la moneda', error:err});
            }else{
                //Si no existe el documento con el id proporcionado mostramos un 404
                if(!currenUpdate){
                    res.status(404).send({message:'No existe la moneda con el id proporcionado'});
                }else{
                    //Si se actualiza correctamente buscamos nuevamente en base ya que el nos retorna
                    //un objeto pero este no es el actualizado sino el objeto viejo
                    Currencies.findById(currencyId, function(err, currenNuevo){
                        //Buscamos por el Id y retornamos el registro viejo y el nuevo
                        res.status(200).send({viejo:currenUpdate,nuevo:currenNuevo})
                    });
                }
            }
        });
    }
}

function deleteCurrency(req,res){
    //Obtenemos el id que llega como parametro
    var currencyId = req.params.id;
    //Verificamos si el parametro enviado es un ObjId
    var idValido = mongoose.Types.ObjectId.isValid(currencyId);
    if(!idValido){
        //Si no es valido mostramos un mensaje de Id invalido
        res.status(409).send({message:'Id invalido. '});
    }else{
        //Buscamos un documento por el Id proporcionado
        Currencies.findById(currencyId, function(err,currency){
            if(err){
                console.log(err)
                res.status(500).send({message:'Error al obtener la moneda.', error:err});
            }else{
                if(!currency){
                    res.status(404).send({message:'No existe la moneda con el id Proporcionado'});
                }else{
                    //Eliminamos el auto encontrado
                    currency.remove(function(err){
                        if(err){
                            res.status(500).send({message:'Error al eliminar la moneda.', error:err});
                        }else{
                            res.status(200).send({message:'La moneda se ha eliminado correctamente'});
                        }
                    });
                }
            }
        });
    }
}

// Definimos los metodos que pueden ser alcanzables
module.exports = {
    getCurrency,
    getCurrencies,
    saveCurrency,
    updateCurrency,
    deleteCurrency
}
