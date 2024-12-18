// src/controllers/usuariosController.js
const { render } = require('ejs');
const usuariosService = require('../services/usuarioService');

class UsuariosController {


	async vistaLogin(req, res) {
		res.render('Usuarios/login', { title: 'Iniciar sesión' });
	}

	async Login(req, res) {
		const { email, contraseña } = req.body;

		try {
			const isMatch = await usuariosService.validPassword(email, contraseña);
			if (!isMatch) {
				return res.render('login', { error: 'Contraseña incorrecta' });
			}

			
			const usuario = await usuariosService.getUsuarioByEmail(email);
			req.session.user = usuario;
			res.redirect('views/index', { title: 'CuidaT' });
		} catch (error) {
			res.render('Usuarios/login', { title: 'CuidaT', error: error.message });
		}
	}

	async vistaRegister(req, res) {
		res.render('Usuarios/register', { title: 'Registrarse' });
	}


	async Register(req, res) {
		try {
			console.log('Datos recibidos:', req.body);
			await usuariosService.createUsuario(req.body);
			res.render('Usuarios/login', { title: 'Iniciar sesión' });
		} catch (error) {
			res.render('Usuarios/register', { title: 'Iniciar sesión', error: error.message });
		}
	}


	async cerrarSesion(req, res) {
		req.session.destroy((err) => {
			if (err) {
				return res.redirect('/');
			}
			res.redirect('/');
		})
	}



	
}

module.exports = new UsuariosController();
