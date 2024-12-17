// src/models/recordatorios.js

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const recordatoriosSchema = new mongoose.Schema({
    recordatorios_id: { type: Number },
    user_id: { type: Number},
    fecha_hora: { type: Date, required: true },
    mensaje_recordatorio: { type: String, required: true },
    tipo_recordatorio: { type: String, required: true },
}, { collection: 'Recordatorios' });


recordatoriosSchema.plugin(AutoIncrement, { inc_field: 'recordatorios_id', start_seq: 13 });


module.exports = mongoose.model('Recordatorios', recordatoriosSchema);
