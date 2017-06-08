'use strict'

// Definimos metodo para ser consumido
// desde el archivo a las rutas
var Cities = require('../models/cities');
var mongoose = require('mongoose');

// Definicion de 5 metodos
function getCity(req, res){
   //Obtenemos el Id que llega
    var cityId = req.params.id;
    // Verificamos si el parametro enviado es un ObjecId
    var idValido = mongoose.Types.ObjectId.isValid(cityId);
    if(!idValido){
        //si no es valido mostramos un mensaje de id invalido
        res.status(409).send({message:'Id Invalido'});
    }else{
        //Buscaremos un documento por el Id proporcionado
        Cities.findById(cityId,function(err,cit){
            if(err){
                console.log(err)
                res.status(509).send({message:'Error al obtener la ciudad. ', error:err});
            }else{
                if(!cit){
                    res.status(404).send({message:'No existe la ciudad con el id proporcionado'});
                }else{
                    res.status(200).send({cit})
                }
            }
        });
    }
}

function getCities(req, res){
    Cities.find({}).sort('nombre').exec(function(err,cits){
        if(err){
            console.log(err)
            res.status(500).send({message:'Error al obtener las ciudades', error:err});
        }else{
            res.status(200).send({cits})
        }
    });
}

function saveCity(req, res){
    var city = new Cities(req.body);

    city.save(function(err,citySaved){
        if(err){
            console.log(err)
            res.status(500).send({message:'Error al guardar en la ciudad', error:err});
        }else{
            res.status(200).send({saved:citySaved})
        }
    });
};

function updateCity(req, res){
    //obtenemos el id que llega como parametro
    var cityId = req.params.id;
    //verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(cityId);
    if(!idValido){
        //Si no es valido mostramos un mensaje de Id invalido
        res.status(409).send({message:'Id Invalido'});
    }else{
        //utilizamos la función findByAnUpdate, busca un doc por id y lo actualiza
        Cities.findByIdAndUpdate(cityId, req.body, function(err, cityUpdate){
            if(err){
                console.log(err)
                res.status(500).send({message:'Error al actualizar la ciudad', error:err});
            }else{
                //Si no existe el documento con el id proporcionado mostramos un 404
                if(!cityUpdate){
                    res.status(404).send({message:'No existe la ciudad con el id proporcionado'});
                }else{
                    //Si se actualiza correctamente buscamos nuevamente en base ya que el nos retorna
                    //un objeto pero este no es el actualizado sino el objeto viejo
                    Cities.findById(cityId, function(err, cityNuevo){
                        //Buscamos por el Id y retornamos el registro viejo y el nuevo
                        res.status(200).send({viejo:cityUpdate,nuevo:cityNuevo})
                    });
                }
            }
        });
    }
}

function deleteCity(req,res){
    //Obtenemos el id que llega como parametro
    var cityId = req.params.id;
    //Verificamos si el parametro enviado es un ObjId
    var idValido = mongoose.Types.ObjectId.isValid(cityId);
    if(!idValido){
        //Si no es valido mostramos un mensaje de Id invalido
        res.status(409).send({message:'Id invalido. '});
    }else{
        //Buscamos un documento por el Id proporcionado
        Cities.findById(cityId, function(err,city){
            if(err){
                console.log(err)
                res.status(500).send({message:'Error al obtener la ciudad.', error:err});
            }else{
                if(!city){
                    res.status(404).send({message:'No existe la ciudad con el id Proporcionado'});
                }else{
                    //Eliminamos el auto encontrado
                    city.remove(function(err){
                        if(err){
                            res.status(500).send({message:'Error al eliminar la ciudad.', error:err});
                        }else{
                            res.status(200).send({message:'La ciudad se ha eliminado correctamente'});
                        }
                    });
                }
            }
        });
    }
}

// Definimos los metodos que pueden ser alcanzables
module.exports = {
    getCity,
    getCities,
    saveCity,
    updateCity,
    deleteCity
}
