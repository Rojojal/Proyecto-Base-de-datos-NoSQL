// src/routes/RecomendacionesRoutes.js

const express = require('express');
const router = express.Router();
const RecomendacionesController = require('../controllers/recomendacionesController');

// Rutas para manejar las Recomendacioneses
router.post('/Recomendaciones', RecomendacionesController.createRecomendaciones);
router.get('/Recomendaciones/:id', RecomendacionesController.getRecomendaciones);
router.get('/Recomendaciones', RecomendacionesController.getAllRecomendaciones);
router.put('/Recomendaciones/:id', RecomendacionesController.updateRecomendaciones);
router.delete('/Recomendaciones/:id', RecomendacionesController.deleteRecomendaciones);

module.exports = router;
