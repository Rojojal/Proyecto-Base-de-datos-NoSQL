// src/routes/usuarioRoutes.js

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

/** 
 * Rutas para manejar los usuarios
*/
router.get('/login', usuarioController.vistaLogin);
router.post('/login', usuarioController.Login);
router.get('/register', usuarioController.vistaRegister);
router.post('/register', usuarioController.Register);
router.get('/logout', usuarioController.cerrarSesion);

module.exports = router;

