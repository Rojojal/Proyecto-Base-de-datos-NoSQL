// src/routes/historialConsultaController.js

const express = require('express');
const router = express.Router();
const HistorialConsultaController = require('../controllers/historialConsultaController');

/** 
 * Rutas para manejar las historias de consultas
*/
router.get('/', HistorialConsultaController.getAllHistorialConsulta);
router.get('/create', HistorialConsultaController.viewCreateHistorial);
router.post('/add', HistorialConsultaController.createHistorialConsulta);

router.get('/edit/:id', HistorialConsultaController.viewUpdateHistorial);
router.put('/edit/:id', HistorialConsultaController.updateHistorialConsulta);
router.delete('/:id', HistorialConsultaController.deleteHistorialConsulta);

module.exports = router;
