'use strict'

// Definimos metodo para ser consumido
// desde el archivo a las rutas
var Countries = require('../models/country');
var mongoose = require('mongoose');

// Definicion de 5 metodos
function getCountry(req, res){
   //Obtenemos el Id que llega
    var countryId = req.params.id;
    // Verificamos si el parametro enviado es un ObjecId
    var idValido = mongoose.Types.ObjectId.isValid(countryId);
    if(!idValido){
        //si no es valido mostramos un mensaje de id invalido
        res.status(409).send({message:'Id Invalido'});
    }else{
        //Buscaremos un documento por el Id proporcionado
        Countries.findById(countryId,function(err,countr){
            if(err){
                console.log(err)
                res.status(509).send({message:'Error al obtener pais. ', error:err});
            }else{
                if(!countr){
                    res.status(404).send({message:'No existe el pais con el id proporcionado'});
                }else{
                    res.status(200).send({countr})
                }
            }
        });
    }
}

function getCountries(req, res){
    Countries.find({}).sort('nombre').exec(function(err,countrs){
        if(err){
            console.log(err)
            res.status(500).send({message:'Error al obtener los paises', error:err});
        }else{
            res.status(200).send({countrs})
        }
    });
}

function saveCountry(req, res){
    var country = new Countries(req.body);

    country.save(function(err,countrySaved){
        if(err){
            console.log(err)
            res.status(500).send({message:'Error al guardar el pais', error:err});
        }else{
            res.status(200).send({saved:countrySaved})
        }
    });
};

function updateCountry(req, res){
    //obtenemos el id que llega como parametro
    var countryId = req.params.id;
    //verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(countryId);
    if(!idValido){
        //Si no es valido mostramos un mensaje de Id invalido
        res.status(409).send({message:'Id Invalido'});
    }else{
        //utilizamos la función findByAnUpdate, busca un doc por id y lo actualiza
        Countries.findByIdAndUpdate(countryId, req.body, function(err, countryUpdate){
            if(err){
                console.log(err)
                res.status(500).send({message:'Error al actualizar el pais', error:err});
            }else{
                //Si no existe el documento con el id proporcionado mostramos un 404
                if(!countryUpdate){
                    res.status(404).send({message:'No existe el pais con el id proporcionado'});
                }else{
                    //Si se actualiza correctamente buscamos nuevamente en base ya que el nos retorna
                    //un objeto pero este no es el actualizado sino el objeto viejo
                    Countries.findById(countryId, function(err, countryNuevo){
                        //Buscamos por el Id y retornamos el registro viejo y el nuevo
                        res.status(200).send({viejo:countryUpdate,nuevo:countryNuevo})
                    });
                }
            }
        });
    }
}

function deleteCountry(req,res){
    //Obtenemos el id que llega como parametro
    var countryId = req.params.id;
    //Verificamos si el parametro enviado es un ObjId
    var idValido = mongoose.Types.ObjectId.isValid(countryId);
    if(!idValido){
        //Si no es valido mostramos un mensaje de Id invalido
        res.status(409).send({message:'Id invalido. '});
    }else{
        //Buscamos un documento por el Id proporcionado
        Countries.findById(countryId, function(err,country){
            if(err){
                console.log(err)
                res.status(500).send({message:'Error al obtener el pais.', error:err});
            }else{
                if(!country){
                    res.status(404).send({message:'No existe el pais con el id Proporcionado'});
                }else{
                    //Eliminamos el auto encontrado
                    country.remove(function(err){
                        if(err){
                            res.status(500).send({message:'Error al eliminar el pais.', error:err});
                        }else{
                            res.status(200).send({message:'El pais se ha eliminado correctamente'});
                        }
                    });
                }
            }
        });
    }
}

// Definimos los metodos que pueden ser alcanzables
module.exports = {
    getCountry,
    getCountries,
    saveCountry,
    updateCountry,
    deleteCountry
}
