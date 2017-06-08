'use strict';

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

// Modelo para la colleccion Languages
var LanguagesSchema = new Schema(
    {
        nombre: {
            type: String,
            trim: true,
            default: '',
            required: 'Inserta el nombre del lenguaje por favor',
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
        no_hablantes: {            
            type: Number,
            required: "Inserta el numero de hablantes por favor",
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

var Languages = mongoose.model('Languages', LanguagesSchema);

//Podra ser accedido desde cualquier parte si se importa
module.exports = Languages;
