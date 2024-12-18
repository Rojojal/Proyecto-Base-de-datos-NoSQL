// src/models/usuarios.js

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
    user_id: {type: Number},
    nombre: {type: String,required: true},
    contraseña: { type: String, required: true },
    edad: {type: Number,required: true,min: 0,max: 120 },
    genero: {type: String, enum: ['M', 'F', 'Otro'], required: true},
    email: {type: String,required: true,match: /.+@.+\..+/ },
    fecha_registro: {type: Date, required: true, default: Date.now()},
    ubicacion: { type: String, required: true},
    objetivos_salud: {type: String, required: true },
    pais: { type: String,required: true }
}, { collection: 'Usuarios' });

usuarioSchema.plugin(AutoIncrement, { inc_field: 'user_id', start_seq: 13 });

/** 
 * Compara las contraseñas encriptadas con un método nuevo de bcrypt llamado validPassword 
 * Devuelve un true si son iguales, si son diferentes manda un false
*/
usuarioSchema.methods.validPassword = async function(contraseña) {
    return await bcrypt.compare(contraseña, this.contraseña);
};

module.exports = mongoose.model('Usuarios', usuarioSchema);
  
