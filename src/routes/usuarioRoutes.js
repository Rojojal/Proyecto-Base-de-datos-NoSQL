// src/routes/itemRoutes.js

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');


router.post('/usuario',   usuarioController.createUsuario);
router.get('/usuario/:id', usuarioController.getUsuario);
router.get('/usuario', usuarioController.getAllUsuarios);
router.put('/usuario/:id', usuarioController.updateUsuario);
router.delete('/usuario/:id', usuarioController.deleteUsuario);

module.exports = router;