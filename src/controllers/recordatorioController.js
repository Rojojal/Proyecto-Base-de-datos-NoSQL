// src/controllers/recordatoriosController.js
const recordatoriosService = require('../services/recordatoriosService');

class recordatoriosController {

  /** 
   * GET / 
   * Mostrar registros de recordatorios
  */
  async getAllRecordatorios(req, res) {
    try {
      const recordatorios = await recordatoriosService.getAllRecordatorios(req.query);
      res.render('Recordatorios/index', { title: 'Recordatorios', recordatorios });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /** 
   * GET /create
   * Vista crear recordatorio
  */
  async viewCreateRecordatorio(req, res) {
    try {
      res.render('Recordatorios/create', { title: 'Crear recordatorio', recordatorio: {} });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /** 
   * POST / 
   * Botón crear recordatorio
  */
  async createRecordatorio(req, res) {
    try {
      console.log('Datos recibidos:', req.body);
      await recordatoriosService.createRecordatorio(req.body);
      res.redirect('/recordatorios');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /** 
   * GET /:id
   * Vista actualizar recordatorio
  */
  async viewUpdateRecordatorio(req, res) {
    try {
      const recordatorio = await recordatoriosService.getRecordatorio(req.params.id, req.body);
      res.render('Recordatorios/edit', { title: 'Editar recordatorio', recordatorio });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /** 
   * PUT /:id
   * Actualizar datos de recordatorio
  */
  async updateRecordatorio(req, res) {
    try {
      const recordatorio = await recordatoriosService.updateRecordatorio(req.params.id, req.body);
      if (!recordatorio) {
        return res.status(404).json({ error: 'Recordatorio no encontrado' });
      }
      res.redirect('/recordatorios');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  /** 
   * DELETE /:id
   * Eliminar recordatorio
  */
  async deleteRecordatorio(req, res) {
    try {
      const recordatorio = await recordatoriosService.deleteRecordatorio(req.params.id);
      if (!recordatorio) {
        return res.status(404).json({ error: 'Recordatorio no encontrado' });
      }
      res.redirect('/recordatorios');
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async searchRecordatorios(req, res) {
    try {
        const filters = req.query;
        const resultados = await recordatoriosService.getAdvancedRecordatorios(filters);
        res.render('Recordatorios/index', {
            title: 'Búsqueda Avanzada de Recordatorios',
            recordatorios: resultados
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

}

module.exports = new recordatoriosController();
