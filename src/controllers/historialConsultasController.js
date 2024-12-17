// src/controllers/historialConsultaController.js
const historialConsultaService = require('../services/historialConsultaService');

class historialConsultaController {
  /**
   * GET /
   * Mostrar todos los historiales de consulta
   */
  async getAllHistorialConsulta(req, res) {
    try {
      const historiales = await historialConsultaService.getAllHistorialConsulta(req.query);
      res.render('HistorialConsulta/index', { title: 'Historial de Consultas', historiales });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * GET /create
   * Vista para crear un historial de consulta
   */
  async viewCreateHistorial(req, res) {
    try {
      res.render('HistorialConsulta/create', { title: 'Crear Historial de Consulta', historial: {} });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * POST /
   * Crear un historial de consulta
   */
  async createHistorialConsulta(req, res) {
    try {
      console.log('Datos recibidos:', req.body);
      await historialConsultaService.createHistorialConsulta(req.body);
      res.redirect('/historial-consulta');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * GET /:id
   * Vista para editar un historial de consulta
   */
  async viewUpdateHistorial(req, res) {
    try {
      const historial = await historialConsultaService.getHistorialConsulta(req.params.id, req.body);
      if (!historial) {
        return res.status(404).json({ error: 'Historial de consulta no encontrado' });
      }
      res.render('HistorialConsulta/edit', { title: 'Editar Historial de Consulta', historial });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * PUT /:id
   * Actualizar un historial de consulta
   */
  async updateHistorialConsulta(req, res) {
    try {
      const historial = await historialConsultaService.updateHistorialConsulta(req.params.id, req.body);
      if (!historial) {
        return res.status(404).json({ error: 'Historial de consulta no encontrado' });
      }
      res.redirect('/historial-consulta');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * DELETE /:id
   * Eliminar un historial de consulta
   */
  async deleteHistorialConsulta(req, res) {
    try {
      const historial = await historialConsultaService.deleteHistorialConsulta(req.params.id);
      if (!historial) {
        return res.status(404).json({ error: 'Historial de consulta no encontrado' });
      }
      res.redirect('/historial-consulta');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new historialConsultaController();
