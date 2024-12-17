// src/controllers/LogrosController.js
const logrosService = require('../services/logrosService');

class logrosController {

  /** 
   * GET /
   * Mostrar registros de logros
  */
  async getAllLogros(req, res) {
    try {
      const logros = await logrosService.getAllLogros(req.query);
      res.render('Logros/index', { title: 'Logros', logros });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /** 
   * GET /create
   * Vista crear logro
  */
  async viewCreateLogro(req, res) {
    try {
      res.render('Logros/create', { title: 'Crear logro', logro: {} });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /** 
   * POST /
   * Botón crear logro
  */
  async createLogro(req, res) {
    try {
      console.log('Datos recibidos:', req.body);
      await logrosService.createLogro(req.body);
      res.redirect('/logros');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /** 
   * GET /:id
   * Vista actualizar logro
  */
  async viewUpdateLogro(req, res) {
    try {
      const logro = await logrosService.getLogro(req.params.id, req.body);
      res.render('Logros/edit', { title: 'Editar logro', logro });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /** 
   * PUT /:id
   * Actualizar datos de logro
  */
  async updateLogro(req, res) {
    try {
      const logro = await logrosService.updateLogro(req.params.id, req.body);
      if (!logro) {
        return res.status(404).json({ error: 'Logro no encontrado' });
      }
      res.redirect('/logros');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /** 
   * DELETE /:id
   * Eliminar logro
  */
  async deleteLogro(req, res) {
    try {
      const logro = await logrosService.deleteLogro(req.params.id);
      if (!logro) {
        return res.status(404).json({ error: 'Logro no encontrado' });
      }
      res.redirect('/logros');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new logrosController();
