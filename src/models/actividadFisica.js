// src/models/actividadFisica.js

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const actividadFisicaSchema = new mongoose.Schema({
    actividadFisica_id: { type: Number },
    user_id: { type: Number},
    fecha: { type: Date, required: true },
    tipo_actividad: { type: String, required: true},
    duracion_minutos: { type: Number, required: true },
    calorias_quemadas: { type: Number, required: true },
}, { collection: 'ActividadFisica' });


actividadFisicaSchema.plugin(AutoIncrement, { inc_field: 'actividadFisica_id', start_seq: 13 });
actividadFisicaSchema.plugin(AutoIncrement, { inc_field: 'user_id', start_seq: 13 });

module.exports = mongoose.model('ActividadFisica', actividadFisicaSchema);
