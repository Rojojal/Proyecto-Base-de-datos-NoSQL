// src/controllers/usuariosController.js
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
}

module.exports = new UsuariosController();
