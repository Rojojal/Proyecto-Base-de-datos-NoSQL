// src/routes/itemRoutes.js

const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

/** 
 * Rutas para manejar los usuarios

router.get('/', usuarioController.getAllUsuarios);
router.get('/create', usuarioController.viewCreateRecomendaciones);
router.post('/add', usuarioController.createRecomendaciones);

router.get('/edit/:id', usuarioController.viewPdateUsuario)
router.put('/edit/:id', usuarioController.updateUsuario)
router.delete('/:id', usuarioController.deleteUsuario)
*/
router.get('/login', usuarioController.vistaLogin);
router.post('/login', usuarioController.Login);
router.get('/register', usuarioController.vistaRegister);
router.post('/register', usuarioController.Register);
router.get('/logout', usuarioController.cerrarSesion);

module.exports = router;

