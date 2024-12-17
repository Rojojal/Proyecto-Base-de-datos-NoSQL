// src/controllers/RetroalimentacionController.js
const retroalimentacionService = require('../services/retroalimentacionService');

class retroalimentacionController {

   /** 
   * GET / 
   * Mostrar registros de retroalimentación
  */
   async getAllRetroalimentaciones(req, res) {
    try {
      const retroalimentaciones = await retroalimentacionService.getAllRetroalimentaciones(req.query);
      res.render('Retroalimentacion/index', { title: 'Retroalimentaciones', retroalimentaciones });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

   /** 
   * GET / 
   * Vista crear retroalimentación
  */
   async viewCreateRetroalimentacion(req, res) {
    try {
      res.render('Retroalimentacion/create', { title: 'Crear retroalimentación', retroalimentacion: {} });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /** 
   * POST / 
   * Boton crear retroalimentación
  */
  async createRetroalimentacion(req, res) {
    try {
      console.log('Datos recibidos:', req.body);
      await retroalimentacionService.createRetroalimentacion(req.body);
      res.redirect('/retroalimentacion');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /** 
   * GET /:id
   * Vista actualizar retroalimentación
  */
  async viewUpdateRetroalimentacion(req, res) {
    try {
      const retroalimentacion = await retroalimentacionService.getRetroalimentacion(req.params.id, req.body);
      res.render('Retroalimentacion/edit', { title: 'Editar retroalimentación', retroalimentacion });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /** 
   * PUT /:id
   * Actualizar datos de retroalimentación
  */
  async updateRetroalimentacion(req, res) {
    try {
      const retroalimentacion = await retroalimentacionService.updateRetroalimentacion(req.params.id, req.body);
      if (!retroalimentacion) {
        return res.status(404).json({ error: 'Retroalimentación no encontrada' });
      }
      res.redirect('/retroalimentacion');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /** 
   * DELETE /:id
   * Eliminar retroalimentación
  */
  async deleteRetroalimentacion(req, res) {
    try {
      const retroalimentacion = await retroalimentacionService.deleteRetroalimentacion(req.params.id);
      if (!retroalimentacion) {
        return res.status(404).json({ error: 'Retroalimentación no encontrada' });
      }
      res.redirect('/retroalimentacion');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = new retroalimentacionController();
