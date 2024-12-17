// src/models/seguimientoSalud.js

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const seguimientoSaludSchema = new mongoose.Schema({
    seguimiento_salud_id: { type: Number },
    user_id: { type: Number },
    fecha_inicial: { type: Date, required: true },
    fecha_final: { type: Date, required: true },
    metrica: { type: String, required: true },
    valor_inicial: { type: Number, required: true },
    valor_final: { type: Number, required: true },
}, { collection: 'SeguimientoSalud' });


seguimientoSaludSchema.plugin(AutoIncrement, { inc_field: 'seguimiento_salud_id', start_seq: 13 });


module.exports = mongoose.model('SeguimientoSalud', seguimientoSaludSchema);
