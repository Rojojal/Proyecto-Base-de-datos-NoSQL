// src/routes/RecomendacionesRoutes.js

const express = require('express');
const router = express.Router();
const RecomendacionesController = require('../controllers/recomendacionesController');


/** 
 * Rutas para manejar las Recomendaciones
*/
router.get('/', RecomendacionesController.getAllRecomendaciones);
router.get('/create', RecomendacionesController.viewCreateRecomendaciones);
router.post('/add', RecomendacionesController.createRecomendaciones);

router.get('/edit/:id', RecomendacionesController.viewUpdateRecomendaciones);
router.put('/edit/:id', RecomendacionesController.updateRecomendaciones);
router.delete('/:id', RecomendacionesController.deleteRecomendaciones);

router.get('/search', RecomendacionesController.searchRecomendaciones);



module.exports = router;
