'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Modelo para la colleccion Currencies
var CurrenciesSchema = new Schema(
    {
        nombre: {
            type: String,
            trim: true,
            default: '',
            required: 'Inserta un nombre por favor',
            index: {
                unique: false,
                dropDups: true
            }
        },
        iso: {
            type: String,
            trim: true,
            default:'',
            required: "Inserta un iso por favor",
            index: {
                unique: false,
                dropDups: true
            } 
        },
        pais: {            
            type: String,
            trim: true,
            default:'',
            required: "Inserta un pais por favor",
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

var Currencies = mongoose.model('Currencies', CurrenciesSchema);

//Podra ser accedido desde cualquier parte si se importa
module.exports = Currencies;