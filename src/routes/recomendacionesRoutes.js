// src/routes/RecomendacionesRoutes.js

const express = require('express');
const router = express.Router();
const RecomendacionesController = require('../controllers/recomendacionesController');


/** 
 * Rutas para manejar las Recomendaciones
*/
router.get('/', RecomendacionesController.getAllRecomendaciones);
router.get('/create', RecomendacionesController.createRecomendaciones);


module.exports = router;
