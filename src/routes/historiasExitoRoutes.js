// src/routes/historiasExitoRoutes.js

const express = require('express');
const router = express.Router();
const HistoriasExitoController = require('../controllers/historiasExitoController');

/** 
 * Rutas para manejar las historias de exito
*/
router.get('/', HistoriasExitoController.getAllHistoriasExito);
router.get('/create', HistoriasExitoController.viewCreateHistoria);
router.post('/add', HistoriasExitoController.createHistoriaExito);

router.get('/edit/:id', HistoriasExitoController.viewUpdateHistoria);
router.put('/edit/:id', HistoriasExitoController.updateHistoriaExito);
router.delete('/:id', HistoriasExitoController.deleteHistoriaExito);

router.get('/search', HistoriasExitoController.searchHistoriasExito);

module.exports = router;
