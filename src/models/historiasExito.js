// src/models/historiasExito.js

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const historiasExitoSchema = new mongoose.Schema({
    historias_exito_id: { type: Number },
    user_id: { type: Number},
    titulo_historia: { type: String, required: true },
    contenido: { type: String, required: true },
    fecha_publicacion: { type: Date, required: true },
    estado_publicacion: { type: String, required: true },
}, { collection: 'HistoriasExito' });

historiasExitoSchema.plugin(AutoIncrement, { inc_field: 'historias_exito_id', start_seq: 13 });


module.exports = mongoose.model('HistoriasExito', historiasExitoSchema);
