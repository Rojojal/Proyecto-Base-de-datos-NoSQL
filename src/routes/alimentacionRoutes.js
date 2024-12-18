// src/routes/alimentacionRoutes.js

const express = require('express');
const router = express.Router();
const AlimentacionController = require('../controllers/alimentacionController');

/** 
 * Rutas para manejar las alimentaciones
*/
router.get('/', AlimentacionController.getAllAlimentacion);
router.get('/create', AlimentacionController.viewCreateAlimentacion);
router.post('/add', AlimentacionController.createAlimentacion);

router.get('/edit/:id', AlimentacionController.viewUpdateAlimentacion);
router.put('/edit/:id', AlimentacionController.updateAlimentacion);
router.delete('/:id', AlimentacionController.deleteAlimentacion);

router.get('/search', AlimentacionController.searchAlimentacion);


module.exports = router;
