// src/services/recordatoriosService.js

const Recordatorios = require('../models/recordatorios');

class recordatoriosService {


    async createRecordatorio(data) {
        const nuevoRecordatorio = new Recordatorios({
            fecha_hora: data.fecha_hora,
            mensaje_recordatorio: data.mensaje_recordatorio,
            tipo_recordatorio: data.tipo_recordatorio,
        });

        try {
            await nuevoRecordatorio.save();
        } catch (error) {
            throw new Error('Error al insertar recordatorio: ' + error.message);
        }
    }


    async getRecordatorio(id) {
        try {
            return await Recordatorios.findById(id);
        } catch (error) {
            throw new Error('Error al obtener recordatorio: ' + error.message);
        }
    }

    async updateRecordatorio(id, body) {
        try {
            const resultado = await Recordatorios.findByIdAndUpdate(
                id,
                {
                    fecha_hora: body.fecha_hora,
                    mensaje_recordatorio: body.mensaje_recordatorio,
                    tipo_recordatorio: body.tipo_recordatorio,
                });

            return resultado;
        } catch (error) {
            throw new Error('Error al actualizar recordatorio: ' + error.message);
        }
    }


    async deleteRecordatorio(id) {
        try {
            return await Recordatorios.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error al eliminar recordatorio: ' + error.message);
        }
    }


    async getAllRecordatorios(queries) {
        let filtros = {};

        // Filtrar por tipo de recordatorio, si se proporciona
        if (queries?.tipo_recordatorio) {
            filtros.tipo_recordatorio = queries.tipo_recordatorio;
        }

        try {
            return await Recordatorios.find(filtros);
        } catch (error) {
            throw new Error('Error al obtener recordatorios: ' + error.message);
        }
    }
}

module.exports = new recordatoriosService();
