// src/models/retroalimentacion.js

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const retroalimentacionSchema = new mongoose.Schema({
    retroalimentacion_id: { type: Number },
    user_id: { type: Number},
    fecha: { type: Date, required: true },
    tipo_feedback: { type: String, required: true },
    comentario: { type: String, required: true },
    valoracion: { type: Number, required: true, min: 1, max: 5 },
}, { collection: 'Retroalimentacion' });


retroalimentacionSchema.plugin(AutoIncrement, { inc_field: 'retroalimentacion_id', start_seq: 13 });
retroalimentacionSchema.plugin(AutoIncrement, { inc_field: 'user_id', start_seq: 13 });

module.exports = mongoose.model('Retroalimentacion', retroalimentacionSchema);
