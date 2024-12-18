// src/controllers/emocionalController.js
const emocionalService = require('../services/emocionalService');

class emocionalController {
  /**
   * GET /
   * Mostrar todos los registros emocionales
   */
  async getAllEmocional(req, res) {
    try {
      const registros = await emocionalService.getAllEmocional(req.query);
      res.render('Emocional/index', { title: 'Registros Emocionales', registros });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * GET /create
   * Vista para crear un nuevo registro emocional
   */
  async viewCreateEmocional(req, res) {
    try {
      res.render('Emocional/create', { title: 'Crear Registro Emocional', registro: {} });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * POST /
   * Crear un nuevo registro emocional
   */
  async createEmocional(req, res) {
    try {
      console.log('Datos recibidos:', req.body);
      await emocionalService.createEmocional(req.body);
      res.redirect('/emocional');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * GET /:id
   * Vista para editar un registro emocional
   */
  async viewUpdateEmocional(req, res) {
    try {
      const registro = await emocionalService.getEmocional(req.params.id, req.body);
      if (!registro) {
        return res.status(404).json({ error: 'Registro emocional no encontrado' });
      }
      res.render('Emocional/edit', { title: 'Editar Registro Emocional', registro });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * PUT /:id
   * Actualizar un registro emocional
   */
  async updateEmocional(req, res) {
    try {
      const registro = await emocionalService.updateEmocional(req.params.id, req.body);
      if (!registro) {
        return res.status(404).json({ error: 'Registro emocional no encontrado' });
      }
      res.redirect('/emocional');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * DELETE /:id
   * Eliminar un registro emocional
   */
  async deleteEmocional(req, res) {
    try {
      const registro = await emocionalService.deleteEmocional(req.params.id);
      if (!registro) {
        return res.status(404).json({ error: 'Registro emocional no encontrado' });
      }
      res.redirect('/emocional');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async searchEmocional(req, res) {
    try {
        const filters = req.query;
        const resultados = await emocionalService.getAdvancedEmocional(filters);
        res.render('Emocional/index', {
            title: 'Búsqueda Avanzada Emocional',
            registros: resultados
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

}

module.exports = new emocionalController();
