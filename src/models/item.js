// src/models/Item.js

const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    nombreEstudiante: { type: String },
    Cuatrimestre: { type: Number },
    notaMatematicas: { type: Number },
    notaCiencias: { type: Number },
    notaLiteratura: { type: Number },
    notaCivica: { type: Number },
    Condicion: { type: String }
}, { collection: 'Clasificaciones' }); // Especificar el nombre de la colección

module.exports = mongoose.model('Item', ItemSchema);
