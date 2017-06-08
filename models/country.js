'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Modelo para la colleccion Countries
var CountriesSchema = new Schema(
    {
        nombre: {
            type: String,
            trim: true,
            default: '',
            required: 'Inserta el nombre del pais por favor',
            index: {
                unique: false,
                dropDups: true
            }
        },
        capital: {
            type: String,
            trim: true,
            required: "Inserta la capital del pais por favor",
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
        },
        moneda: {            
            type: String,
            trim: true,
            default:'',
            required: "Inserta el nombre de la moneda del pais por favor",
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

var Countries = mongoose.model('Countries', CountriesSchema);

//Podra ser accedido desde cualquier parte si se importa
module.exports = Countries;
