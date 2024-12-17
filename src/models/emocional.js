// src/models/emocional.js

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const emocionalSchema = new mongoose.Schema({
    emocional_id: { type: Number },
    user_id: { type: Number},
    fecha: { type: Date, required: true },
    estado_animo: { type: String, required: true },
    estres_nivel: { type: Number, required: true},
    sugerencias_manejo_estres: { type: String, required: true },
}, { collection: 'Emocional' });


emocionalSchema.plugin(AutoIncrement, { inc_field: 'emocional_id', start_seq: 13 });


module.exports = mongoose.model('Emocional', emocionalSchema);
