// src/controllers/alimentacionController.js
const alimentacionService = require('../services/alimentacionService');

class alimentacionController {
  /**
   * GET /
   * Mostrar todos los registros de alimentación
   */
  async getAllAlimentacion(req, res) {
    try {
      const registros = await alimentacionService.getAllAlimentacion(req.query);
      res.render('Alimentacion/index', { title: 'Registros de Alimentación', registros });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * GET /create
   * Vista para crear un nuevo registro de alimentación
   */
  async viewCreateAlimentacion(req, res) {
    try {
      res.render('Alimentacion/create', { title: 'Crear Registro de Alimentación', registro: {} });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * POST /
   * Crear un nuevo registro de alimentación
   */
  async createAlimentacion(req, res) {
    try {
      console.log('Datos recibidos:', req.body);
      await alimentacionService.createAlimentacion(req.body);
      res.redirect('/alimentacion');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * GET /:id
   * Vista para editar un registro de alimentación
   */
  async viewUpdateAlimentacion(req, res) {
    try {
      const registro = await alimentacionService.getAlimentacion(req.params.id, req.body);
      if (!registro) {
        return res.status(404).json({ error: 'Registro de alimentación no encontrado' });
      }
      res.render('Alimentacion/edit', { title: 'Editar Registro de Alimentación', registro });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * PUT /:id
   * Actualizar un registro de alimentación
   */
  async updateAlimentacion(req, res) {
    try {
      const registro = await alimentacionService.updateAlimentacion(req.params.id, req.body);
      if (!registro) {
        return res.status(404).json({ error: 'Registro de alimentación no encontrado' });
      }
      res.redirect('/alimentacion');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /**
   * DELETE /:id
   * Eliminar un registro de alimentación
   */
  async deleteAlimentacion(req, res) {
    try {
      const registro = await alimentacionService.deleteAlimentacion(req.params.id);
      if (!registro) {
        return res.status(404).json({ error: 'Registro de alimentación no encontrado' });
      }
      res.redirect('/alimentacion');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async searchAlimentacion(req, res) {
    try {
        const filters = req.query;
        const resultados = await alimentacionService.getAdvancedAlimentacion(filters);
        res.render('Alimentacion/index', {
            title: 'Búsqueda Avanzada de Alimentación',
            registros: resultados
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

}

module.exports = new alimentacionController();
