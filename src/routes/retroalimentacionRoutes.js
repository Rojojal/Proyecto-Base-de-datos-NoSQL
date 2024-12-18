// src/controllers/retroalimentacionRoutes.js

const express = require('express');
const router = express.Router();
const RetroalimentacionController = require('../controllers/retroalimentacionController');


/** 
 * Rutas para manejar la retroalimentacion
*/
router.get('/', RetroalimentacionController.getAllRetroalimentaciones);
router.get('/create', RetroalimentacionController.viewCreateRetroalimentacion);
router.post('/add', RetroalimentacionController.createRetroalimentacion);

router.get('/edit/:id', RetroalimentacionController.viewUpdateRetroalimentacion);
router.put('/edit/:id', RetroalimentacionController.updateRetroalimentacion);
router.delete('/:id', RetroalimentacionController.deleteRetroalimentacion);

router.get('/search', RetroalimentacionController.searchRetroalimentacion);


module.exports = router;
