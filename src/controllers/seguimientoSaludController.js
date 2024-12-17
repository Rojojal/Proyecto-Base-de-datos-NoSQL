// src/controllers/SeguimientoSaludController.js
const { render } = require('ejs');
const seguimientoSaludService = require('../services/seguimientoSaludService');

class seguimientoSaludController {

   /** 
   * GET / 
   * Mostrar registros de seguimiento de salud
  */
   async getAllSeguimientosSalud(req, res) {
    try {
      const seguimientosSalud = await seguimientoSaludService.getAllSeguimientosSalud(req.query);
      res.render('SeguimientoSalud/index', { title: 'Seguimientos de Salud', seguimientosSalud });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

   /** 
   * GET / 
   * Vista crear seguimiento de salud
  */
   async viewCreateSeguimientoSalud(req, res) {
    try {
      res.render('SeguimientoSalud/create', { title: 'Crear seguimiento de salud', seguimientoSalud: {} });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /** 
   * POST / 
   * Boton crear seguimiento de salud
  */
  async createSeguimientoSalud(req, res) {
    try {
      console.log('Datos recibidos:', req.body);
      await seguimientoSaludService.createSeguimientoSalud(req.body);
      res.redirect('/seguimientoSalud');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /** 
   * GET /:id
   * Vista actualizar seguimiento de salud
  */
  async viewUpdateSeguimientoSalud(req, res) {
    try {
      const seguimientoSalud = await seguimientoSaludService.getSeguimientoSalud(req.params.id, req.body);
      res.render('SeguimientoSalud/edit', { title: 'Editar seguimiento de salud', seguimientoSalud });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /** 
   * PUT /:id
   * Actualizar datos de seguimiento de salud
  */
  async updateSeguimientoSalud(req, res) {
    try {
      const seguimientoSalud = await seguimientoSaludService.updateSeguimientoSalud(req.params.id, req.body);
      if (!seguimientoSalud) {
        return res.status(404).json({ error: 'Seguimiento de salud no encontrado' });
      }
      res.redirect('/seguimientoSalud');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /** 
   * DELETE /:id
   * Eliminar seguimiento de salud
  */
  async deleteSeguimientoSalud(req, res) {
    try {
      const seguimientoSalud = await seguimientoSaludService.deleteSeguimientoSalud(req.params.id);
      if (!seguimientoSalud) {
        return res.status(404).json({ error: 'Seguimiento de salud no encontrado' });
      }
      res.redirect('/seguimientoSalud');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new seguimientoSaludController();
