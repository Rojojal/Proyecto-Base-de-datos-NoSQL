// src/routes/historialConsultaRoutes.js

const express = require('express');
const router = express.Router();
const HistorialConsultaController = require('../controllers/historialConsultasController');

/** 
 * Rutas para manejar las historias de consultas
*/
router.get('/', HistorialConsultaController.getAllHistorialConsulta);
router.get('/create', HistorialConsultaController.viewCreateHistorial);
router.post('/add', HistorialConsultaController.createHistorialConsulta);

router.get('/edit/:id', HistorialConsultaController.viewUpdateHistorial);
router.put('/edit/:id', HistorialConsultaController.updateHistorialConsulta);
router.delete('/:id', HistorialConsultaController.deleteHistorialConsulta);

router.get('/search', HistorialConsultaController.searchHistorialConsulta);


module.exports = router;
