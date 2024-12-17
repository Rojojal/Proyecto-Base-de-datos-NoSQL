// src/controllers/usuariosController.js
const { render } = require('ejs');
const usuariosService = require('../services/usuarioService');

class UsuariosController {

  async createUsuario(req, res) {
    try {
      const usuario = await usuariosService.createUsuario(req.body);
      res.status(201).json(usuario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getUsuario(req, res) {
    try {
      const usuario = await usuariosService.getUsuario(req.params.id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(usuario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateUsuario(req, res) {
    try {
      const usuario = await usuariosService.updateUsuario(req.params.id, req.body);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(usuario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteUsuario(req, res) {
    try {
      const usuario = await usuariosService.deleteUsuario(req.params.id);
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json({ message: 'Usuario eliminado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async getAllUsuarios(req, res) {
    try {
      const usuarios = await usuariosService.getAllUsuarios(req.query);
      if (!usuarios || usuarios.length === 0) {
        return res.status(404).json({ error: 'No se encontraron usuarios' });
      }
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }


  async vistaLogin(req, res) {
    res.render('Usuarios/login', { title: 'Iniciar sesión' });
}

 async Login(req, res) {
        const { email, password } = req.body;

        try {
            // Validar las credenciales del usuario
            const isMatch = await usuariosService.validatePassword(email, password);
            if (!isMatch) {
                return res.render('login', { error: 'Contraseña incorrecta' });
            }

            // Iniciar sesión
            const usuario = await usuariosService.getUsuarioByEmail(email);
            req.session.user = usuario;
            res.redirect('/');
        } catch (error) {
            res.render('Usuarios/login', { error: error.message });
        }
    }

    async vistaRegister(req, res) {
      res.render('Usuarios/register', { title: 'Registrarse' });
  }


  async Register(req, res) {
    try {
       console.log('Datos recibidos:', req.body);
       const usuario = await usuariosService.createUsuario(req.body);
        res.redirect('Usuarios/login');
    } catch (error) {
        res.render('Usuarios/register', { error: error.message });
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
