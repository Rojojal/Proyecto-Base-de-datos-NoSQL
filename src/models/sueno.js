// src/models/sueno.js

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const suenoSchema = new mongoose.Schema({
    sueno_id: { type: Number },
    user_id: { type: Number},
    fecha: { type: Date, required: true },
    duracion_sueno: { type: Number, required: true },
    calidad_sueno: { type: String, required: true },
    sugerencias_descanso: { type: String, required: true },
}, { collection: 'Sueño' });


suenoSchema.plugin(AutoIncrement, { inc_field: 'sueno_id', start_seq: 13 });


module.exports = mongoose.model('Sueño', suenoSchema);
