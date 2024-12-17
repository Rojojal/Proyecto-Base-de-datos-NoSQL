// src/routes/actividadFisicaController.js

const express = require('express');
const router = express.Router();
const ActividadFisicaController = require('../controllers/actividadFisicaController');

/** 
 * Rutas para manejar las actividades fisicas
*/
router.get('/', ActividadFisicaController.getAllActividadFisica);
router.get('/create', ActividadFisicaController.viewCreateActividadFisica);
router.post('/add', ActividadFisicaController.createActividadFisica);

router.get('/edit/:id', ActividadFisicaController.viewUpdateActividadFisica);
router.put('/edit/:id', ActividadFisicaController.updateActividadFisica);
router.delete('/:id', ActividadFisicaController.deleteActividadFisica);

module.exports = router;
