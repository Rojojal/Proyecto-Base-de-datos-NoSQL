// src/routes/recordatoriosController.js

const express = require('express');
const router = express.Router();
const RecordatoriosController = require('../controllers/recordatoriosController');


/** 
 * Rutas para manejar las Recordatorios
*/
router.get('/', RecordatoriosController.getAllRecordatorios);
router.get('/create', RecordatoriosController.viewCreateRecordatorio);
router.post('/add', RecordatoriosController.createRecordatorio);

router.get('/edit/:id', RecordatoriosController.viewUpdateRecordatorio);
router.put('/edit/:id', RecordatoriosController.updateRecordatorio);
router.delete('/:id', RecordatoriosController.deleteRecordatorio);

module.exports = router;
