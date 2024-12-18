// src/controllers/suenoController.js
const { render } = require('ejs');
const SuenoService = require('../services/suenoService');

class suenoController {

   /** 
   * GET / 
   * Mostrar todos los registros de sueño
   */
   async getAllSuenos(req, res) {
    try {
      const suenos = await SuenoService.getAllSuenos();
      res.render('Sueno/index', { title: 'Registros de Sueño', suenos });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

   /** 
   * GET /create
   * Vista para crear un nuevo registro de sueño
   */
   async viewCreateSueno(req, res) {
    try {
      res.render('Sueno/create', { title: 'Crear registro de sueño', sueno: {} });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /** 
   * POST / 
   * Botón para crear un nuevo registro de sueño
   */
  async createSueno(req, res) {
    try {
      console.log('Datos recibidos:', req.body);
      await SuenoService.createSueno(req.body);
      res.redirect('/sueno');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /** 
   * GET /:id
   * Vista para actualizar un registro de sueño
   */
  async viewUpdateSueno(req, res) {
    try {
      const sueno = await SuenoService.getSueno(req.params.id, req.body);
      if (!sueno) {
        return res.status(404).json({ error: 'Registro de sueño no encontrado' });
      }
      res.render('Sueno/edit', { title: 'Editar registro de sueño', sueno });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /** 
   * PUT /:id
   * Actualizar un registro de sueño
   */
  async updateSueno(req, res) {
    try {
      const sueno = await SuenoService.updateSueno(req.params.id, req.body);
      if (!sueno) {
        return res.status(404).json({ error: 'Registro de sueño no encontrado' });
      }
      res.redirect('/sueno');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /** 
   * DELETE /:id
   * Eliminar un registro de sueño
   */
  async deleteSueno(req, res) {
    try {
      const sueno = await SuenoService.deleteSueno(req.params.id);
      if (!sueno) {
        return res.status(404).json({ error: 'Registro de sueño no encontrado' });
      }
      res.redirect('/sueno');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async searchSuenos(req, res) {
    try {
        const filters = req.query;
        const resultados = await suenoService.getAdvancedSuenos(filters);
        res.render('Sueno/index', {
            title: 'Búsqueda Avanzada de Sueño',
            suenos: resultados,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

}

module.exports = new suenoController();
