// src/models/alimentacion.js

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const alimentacionSchema = new mongoose.Schema({
    alimentacion_id: { type: Number },
    user_id: { type: Number },
    comidas: { type: String, required: true },
    calorias_totales: { type: Number, required: true },
    agua_consumida_ml: { type: Number, required: true},
    sugerencias_nutricionales: { type: String, required: true },
}, { collection: 'Alimentacion' });

alimentacionSchema.plugin(AutoIncrement, { inc_field: 'alimentacion_id', start_seq: 13 });
alimentacionSchema.plugin(AutoIncrement, { inc_field: 'user_id', start_seq: 13 });

module.exports = mongoose.model('Alimentacion', alimentacionSchema);
