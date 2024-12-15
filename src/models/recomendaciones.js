// src/models/recomendaciones.js

const mongoose = require('mongoose');

const recomendacionesSchema = new mongoose.Schema({
    recomendaciones_id: {type: Number, required: true},
    user_id: {type: Number, required: true},
    fecha: {type: Date, required: true},
    tipo_recomendacion: {type: String, required: true},
    mensaje_recomendacion: {type: String, required: true},
    nivel_prioridad: {type: String, required: true},
}, { collection: 'Recomendaciones' });

module.exports = mongoose.model('Recomendaciones', recomendacionesSchema);
