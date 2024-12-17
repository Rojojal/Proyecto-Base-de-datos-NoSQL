// src/models/recomendaciones.js

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const recomendacionesSchema = new mongoose.Schema({
    recomendaciones_id: {type: Number},
    user_id: {type: Number},
    fecha: {type: Date, required: true},
    tipo_recomendacion: {type: String, required: true},
    mensaje_recomendacion: {type: String, required: true},
    nivel_prioridad: {type: String, required: true},
}, { collection: 'Recomendaciones' });

recomendacionesSchema.plugin(AutoIncrement, { inc_field: 'recomendaciones_id', start_seq: 13 });

module.exports = mongoose.model('Recomendaciones', recomendacionesSchema);
