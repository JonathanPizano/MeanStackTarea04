'use strict'

// Definimos metodo para ser consumido
// desde el archivo a las rutas
var Auto = require('../models/auto');
var mongoose = require('mongoose');

function prueba(req,res){
    if(req.params.id){
        var id = req.params.id
    }else{
        var id = "SIN ID"
    }
    res.status(200).send(
        {
            message:"Este es el id: " + id
        }
    )
}

// Definicion de 5 metodos
function getAuto(req, res){
   //Obtenemos el Id que llega
    var autoId = req.params.id;
    // Verificamos si el parametro enviado es un ObjecId
    var idValido = mongoose.Types.ObjectId.isValid(autoId);
    if(!idValido){
        //si no es valido mostramos un mensaje de id invalido
        res.status(409).send({message:'Id Invalido'});
    }else{
        //Buscaremos un documento por el Id proporcionado
        Auto.findById(autoId,function(err,auto){
            if(err){
                console.log(err)
                res.status(509).send({message:'Error al obtener auto. ', error:err});
            }else{
                if(!auto){
                    res.status(404).send({message:'No existe el auto con el id proporcionado'});
                }else{
                    res.status(200).send({auto})
                }
            }
        });
    }
}

function getAutos(req, res){
    Auto.find({}).sort('anio').exec(function(err,autos){
        if(err){
            console.log(err)
            res.status(500).send({message:'Error al obtener los autos', error:err});
        }else{
            res.status(200).send({autos})
        }
    });
}

function saveAuto(req, res){
    var auto = new Auto(req.body);

    auto.save(function(err,autoSaved){
        if(err){
            console.log(err)
            res.status(500).send({message:'Error al guardar en el Auto', error:err});
        }else{
            res.status(200).send({saved:autoSaved})
        }
    });
};

function updateAuto(req, res){
    //obtenemos el id que llega como parametro
    var autoId = req.params.id;
    //verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(autoId);
    if(!idValido){
        //Si no es valido mostramos un mensaje de Id invalido
        res.status(409).send({message:'Id Invalido'});
    }else{
        //utilizamos la función findByAnUpdate, busca un doc por id y lo actualiza
        Auto.findByIdAndUpdate(autoId, req.body, function(err, autoUpdate){
            if(err){
                console.log(err)
                res.status(500).send({message:'Error al actualizar el Auto', error:err});
            }else{
                //Si no existe el documento con el id proporcionado mostramos un 404
                if(!autoUpdate){
                    res.status(404).send({message:'No existe el auto con el id proporcionado'});
                }else{
                    //Si se actualiza correctamente buscamos nuevamente en base ya que el nos retorna
                    //un objeto pero este no es el actualizado sino el objeto viejo
                    Auto.findById(autoId, function(err, autoNuevo){
                        //Buscamos por el Id y retornamos el registro viejo y el nuevo
                        res.status(200).send({viejo:autoUpdate,nuevo:autoNuevo})
                    });
                }
            }
        });
    }
}

function deleteAuto(req,res){
    //Obtenemos el id que llega como parametro
    var autoId = req.params.id;
    //Verificamos si el parametro enviado es un ObjId
    var idValido = mongoose.Types.ObjectId.isValid(autoId);
    if(!idValido){
        //Si no es valido mostramos un mensaje de Id invalido
        res.status(409).send({message:'Id invalido. '});
    }else{
        //Buscamos un documento por el Id proporcionado
        Auto.findById(autoId, function(err,auto){
            if(err){
                console.log(err)
                res.status(500).send({message:'Error al obtener el auto.', error:err});
            }else{
                if(!auto){
                    res.status(404).send({message:'No existe el auto con el id Proporcionado'});
                }else{
                    //Eliminamos el auto encontrado
                    auto.remove(function(err){
                        if(err){
                            res.status(500).send({message:'Error al eliminar el auto.', error:err});
                        }else{
                            res.status(200).send({message:'El auto se ha eliminado correctamente'});
                        }
                    });
                }
            }
        });
    }
}

// Definimos los metodos que pueden ser alcanzables
module.exports = {
    prueba,
    getAuto,
    getAutos,
    saveAuto,
    updateAuto,
    deleteAuto
}