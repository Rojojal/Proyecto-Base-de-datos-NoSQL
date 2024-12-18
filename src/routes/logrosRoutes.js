// src/routes/logrosRoutes.js

const express = require('express');
const router = express.Router();
const LogrosController = require('../controllers/logrosController');


/** 
 * Rutas para manejar los logros
*/
router.get('/', LogrosController.getAllLogros);
router.get('/create', LogrosController.viewCreateLogro);
router.post('/add', LogrosController.createLogro);

router.get('/edit/:id', LogrosController.viewUpdateLogro);
router.put('/edit/:id', LogrosController.updateLogro);
router.delete('/:id', LogrosController.deleteLogro);

router.get('/search', LogrosController.searchLogros);

module.exports = router;
