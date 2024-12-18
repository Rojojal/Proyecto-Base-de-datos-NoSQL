// src/routes/suenoRoutes.js
const express = require('express');
const router = express.Router();
const SuenoController = require('../controllers/suenoController');

/** 
 * Rutas para manejar los registros de sueño
 */
router.get('/', SuenoController.getAllSuenos); 
router.get('/create', SuenoController.viewCreateSueno); 
router.post('/add', SuenoController.createSueno);

router.get('/edit/:id', SuenoController.viewUpdateSueno); 
router.put('/edit/:id', SuenoController.updateSueno); 
router.delete('/:id', SuenoController.deleteSueno); 

router.get('/search', SuenoController.searchSuenos);


module.exports = router;
