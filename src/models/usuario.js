// src/models/usuarios.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
    user_id: {type: Number, required: true},
    nombre: {type: String,required: true},
    edad: {type: Number,required: true,min: 0,max: 120 },
    genero: {type: String, enum: ['M', 'F', 'Otro'], required: true},
    email: {type: String,required: true,match: /.+@.+\..+/ },
    fecha_registro: {type: Date, required: true},
    ubicacion: { type: String, required: true},
    objetivos_salud: {type: String, required: true },
    pais: { type: String,required: true }
}, { collection: 'Usuarios' });

module.exports = mongoose.model('Usuarios', usuarioSchema);
  
