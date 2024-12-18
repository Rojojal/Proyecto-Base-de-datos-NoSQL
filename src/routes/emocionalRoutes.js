//src/routes/emocionalRoutes.js

const express = require('express');
const router = express.Router();
const EmocionalController = require('../controllers/emocionalController');

/** 
 * Rutas para manejar lo emocional
*/
router.get('/', EmocionalController.getAllEmocional);
router.get('/create', EmocionalController.viewCreateEmocional);
router.post('/add', EmocionalController.createEmocional);

router.get('/edit/:id', EmocionalController.viewUpdateEmocional);
router.put('/edit/:id', EmocionalController.updateEmocional);
router.delete('/:id', EmocionalController.deleteEmocional);

router.get('/search', EmocionalController.searchEmocional);


module.exports = router;
