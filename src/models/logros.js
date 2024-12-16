// src/models/logros.js

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const logrosSchema = new mongoose.Schema({
    user_id: { type: Number },
    logro_id: { type: Number },
    tipo_logro: { type: String, required: true },
    descripcion: { type: String, required: true },
    fecha_logro: { type: Date, required: true },
}, { collection: 'Logros' });


logrosSchema.plugin(AutoIncrement, { inc_field: 'logro_id', start_seq: 13 });
logrosSchema.plugin(AutoIncrement, { inc_field: 'user_id', start_seq: 13 });

module.exports = mongoose.model('Logros', logrosSchema);
