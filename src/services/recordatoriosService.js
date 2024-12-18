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

    async getAdvancedRecordatorios(filters) {
        let query = {};
    
        // Filtrar por tipo de recordatorio
        if (filters.tipoRecordatorio) {
            query.tipo_recordatorio = filters.tipoRecordatorio;
        }
    
        // Filtrar por contenido del mensaje
        if (filters.keyword) {
            query.mensaje_recordatorio = { $regex: filters.keyword, $options: 'i' };
        }
    
        // Filtrar por rango de fechas y horas
        if (filters.fechaInicio && filters.fechaFin) {
            query.fecha_hora = {
                $gte: new Date(filters.fechaInicio),
                $lte: new Date(filters.fechaFin)
            };
        }
    
        try {
            return await Recordatorios.find(query);
        } catch (error) {
            throw new Error('Error en la búsqueda avanzada: ' + error.message);
        }
    }
    
}

module.exports = new recordatoriosService();
