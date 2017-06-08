'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var AutoSchema = new Schema(
    {
        marca: {
            type: String,
            trim: true,
            default: '',
            required: 'Inserta una marca por favor',
            index: {
                unique: false,
                dropDups: true
            }
        },
        modelo: {
            type: String,
            required: "Inserta un modelo por favor",
            default:'',
            index: {
                unique: false,
                dropDups: true
            } 
        },
        anio:{            
            type: Number,
            required: "Inserta un anio por favor",
            default:'',
            index: {
                unique: false,
                dropDups: true
            }
        },
        version:{            
            type: String,
            trim: true,
            default:'',
            required: "Inserta un anio por favor",
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

//Definiremos que nuestro esquema se podra llamar Auto
// en las operaciones de nuestro controlador
var Auto = mongoose.model('Auto', AutoSchema);

//Podra ser accedido desde cualquier parte si se importa
module.exports = Auto;

