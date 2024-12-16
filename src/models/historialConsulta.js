// src/models/historialConsulta.js

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const historialConsultaSchema = new mongoose.Schema({
    historial_consulta_id: { type: Number },
    user_id: { type: Number },
    fecha: { type: Date, required: true },
    tipo_consulta: { type: String, required: true },
    especialista: { type: String, required: true },
    resultado_consulta: { type: String, required: true },
    recomendaciones: { type: String, required: true },
}, { collection: 'HistorialConsulta' });

historialConsultaSchema.plugin(AutoIncrement, { inc_field: 'historial_consulta_id', start_seq: 13 });
historialConsultaSchema.plugin(AutoIncrement, { inc_field: 'user_id', start_seq: 13 });

module.exports = mongoose.model('HistorialConsulta', historialConsultaSchema);
