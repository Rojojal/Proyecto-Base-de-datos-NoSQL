// src/controllers/historiasExitoController.js
const historiasExitoService = require('../services/historiasExitoService');

class historiasExitoController {
  /**
   * GET /
   * Mostrar todas las historias de éxito
   */
  async getAllHistoriasExito(req, res) {
    try {
      const historias = await historiasExitoService.getAllHistoriasExito(req.query);
      res.render('HistoriasExito/index', { title: 'Historias de Éxito', historias });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * GET /create
   * Vista para crear una historia de éxito
   */
  async viewCreateHistoria(req, res) {
    try {
      res.render('HistoriasExito/create', { title: 'Crear Historia de Éxito', historia: {} });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * POST /
   * Crear una historia de éxito
   */
  async createHistoriaExito(req, res) {
    try {
      console.log('Datos recibidos:', req.body);
      await historiasExitoService.createHistoriaExito(req.body);
      res.redirect('/historias-exito');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * GET /:id
   * Vista para editar una historia de éxito
   */
  async viewUpdateHistoria(req, res) {
    try {
      const historia = await historiasExitoService.getHistoriaExito(req.params.id, req.body);
      if (!historia) {
        return res.status(404).json({ error: 'Historia no encontrada' });
      }
      res.render('HistoriasExito/edit', { title: 'Editar Historia de Éxito', historia });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * PUT /:id
   * Actualizar una historia de éxito
   */
  async updateHistoriaExito(req, res) {
    try {
      const historia = await historiasExitoService.updateHistoriaExito(req.params.id, req.body);
      if (!historia) {
        return res.status(404).json({ error: 'Historia no encontrada' });
      }
      res.redirect('/historias-exito');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * DELETE /:id
   * Eliminar una historia de éxito
   */
  async deleteHistoriaExito(req, res) {
    try {
      const historia = await historiasExitoService.deleteHistoriaExito(req.params.id);
      if (!historia) {
        return res.status(404).json({ error: 'Historia no encontrada' });
      }
      res.redirect('/historias-exito');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new historiasExitoController();
