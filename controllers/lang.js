'use strict'

// Definimos metodo para ser consumido
// desde el archivo a las rutas
var Languages = require('../models/lang');
var mongoose = require('mongoose');

// Definicion de 5 metodos
function getLanguage(req, res){
   //Obtenemos el Id que llega
    var langId = req.params.id;
    // Verificamos si el parametro enviado es un ObjecId
    var idValido = mongoose.Types.ObjectId.isValid(langId);
    if(!idValido){
        //si no es valido mostramos un mensaje de id invalido
        res.status(409).send({message:'Id Invalido'});
    }else{
        //Buscaremos un documento por el Id proporcionado
        Languages.findById(langId,function(err,langg){
            if(err){
                console.log(err)
                res.status(509).send({message:'Error al obtener el lenguaje. ', error:err});
            }else{
                if(!langg){
                    res.status(404).send({message:'No existe el lenguaje con el id proporcionado'});
                }else{
                    res.status(200).send({langg})
                }
            }
        });
    }
}

function getLanguages(req, res){
    Languages.find({}).sort('nombre').exec(function(err,langgs){
        if(err){
            console.log(err)
            res.status(500).send({message:'Error al obtener los lenguajes', error:err});
        }else{
            res.status(200).send({langgs})
        }
    });
}

function saveLanguage(req, res){
    var language = new Languages(req.body);

    language.save(function(err,langSaved){
        if(err){
            console.log(err)
            res.status(500).send({message:'Error al guardar el lenguaje', error:err});
        }else{
            res.status(200).send({saved:langSaved})
        }
    });
};

function updateLanguage(req, res){
    //obtenemos el id que llega como parametro
    var langId = req.params.id;
    //verificamos si el parametro enviado es un ObjectId
    var idValido = mongoose.Types.ObjectId.isValid(langId);
    if(!idValido){
        //Si no es valido mostramos un mensaje de Id invalido
        res.status(409).send({message:'Id Invalido'});
    }else{
        //utilizamos la función findByAnUpdate, busca un doc por id y lo actualiza
        Languages.findByIdAndUpdate(langId, req.body, function(err, langUpdate){
            if(err){
                console.log(err)
                res.status(500).send({message:'Error al actualizar el lenguaje', error:err});
            }else{
                //Si no existe el documento con el id proporcionado mostramos un 404
                if(!langUpdate){
                    res.status(404).send({message:'No existe el lenguaje con el id proporcionado'});
                }else{
                    //Si se actualiza correctamente buscamos nuevamente en base ya que el nos retorna
                    //un objeto pero este no es el actualizado sino el objeto viejo
                    Languages.findById(langId, function(err, langNuevo){
                        //Buscamos por el Id y retornamos el registro viejo y el nuevo
                        res.status(200).send({viejo:langUpdate,nuevo:langNuevo})
                    });
                }
            }
        });
    }
}

function deleteLanguage(req,res){
    //Obtenemos el id que llega como parametro
    var langId = req.params.id;
    //Verificamos si el parametro enviado es un ObjId
    var idValido = mongoose.Types.ObjectId.isValid(langId);
    if(!idValido){
        //Si no es valido mostramos un mensaje de Id invalido
        res.status(409).send({message:'Id invalido. '});
    }else{
        //Buscamos un documento por el Id proporcionado
        Languages.findById(langId, function(err,lang){
            if(err){
                console.log(err)
                res.status(500).send({message:'Error al obtener el lenguaje.', error:err});
            }else{
                if(!lang){
                    res.status(404).send({message:'No existe el lenguaje con el id Proporcionado'});
                }else{
                    //Eliminamos el auto encontrado
                    lang.remove(function(err){
                        if(err){
                            res.status(500).send({message:'Error al eliminar el lenguaje.', error:err});
                        }else{
                            res.status(200).send({message:'El lenguaje se ha eliminado correctamente'});
                        }
                    });
                }
            }
        });
    }
}

// Definimos los metodos que pueden ser alcanzables
module.exports = {
    getLanguage,
    getLanguages,
    saveLanguage,
    updateLanguage,
    deleteLanguage
}
