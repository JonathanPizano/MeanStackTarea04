'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Modelo para la colleccion Cities
var CitiesSchema = new Schema(
    {
        nombre: {
            type: String,
            trim: true,
            default: '',
            required: 'Inserta el nombre de la ciudad por favor',
            index: {
                unique: false,
                dropDups: true
            }
        },
        pais: {
            type: String,
            trim: true,
            required: "Inserta el nombre del pais por favor",
            default:'',
            index: {
                unique: false,
                dropDups: true
            } 
        },
        poblacion: {            
            type: Number,
            required: "Inserta el numero de pobladores por favor",
            default:'',
            index: {
                unique: false,
                dropDups: true
            }
        }
    },
    {
        timestamps: true
    }
);

var Cities = mongoose.model('Cities', CitiesSchema);

//Podra ser accedido desde cualquier parte si se importa
module.exports = Cities;