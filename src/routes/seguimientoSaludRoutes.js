// src/routes/seguimientoSaludRoutes.js

const express = require('express');
const router = express.Router();
const SeguimientoSaludController = require('../controllers/seguimientoSaludController');


/** 
 * Rutas para manejar el seguimiento de salud
*/
router.get('/', SeguimientoSaludController.getAllSeguimientosSalud);
router.get('/create', SeguimientoSaludController.viewCreateSeguimientoSalud);
router.post('/add', SeguimientoSaludController.createSeguimientoSalud);

router.get('/edit/:id', SeguimientoSaludController.viewUpdateSeguimientoSalud);
router.put('/edit/:id', SeguimientoSaludController.updateSeguimientoSalud);
router.delete('/:id', SeguimientoSaludController.deleteSeguimientoSalud);

router.get('/search', SeguimientoSaludController.searchSeguimientoSalud);


module.exports = router;
