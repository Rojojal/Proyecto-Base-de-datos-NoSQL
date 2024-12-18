// src/services/logrosService.js

const Logros = require('../models/logros');

class logrosService {


    async createLogro(data) {
        const nuevoLogro = new Logros({
            tipo_logro: data.tipo_logro,
            descripcion: data.descripcion,
            fecha_logro: data.fecha_logro,
        });

        try {
            await nuevoLogro.save();
        } catch (error) {
            throw new Error('Error al insertar logro: ' + error.message);
        }
    }


    async getLogro(id) {
        try {
            return await Logros.findById(id);
        } catch (error) {
            throw new Error('Error al obtener logro: ' + error.message);
        }
    }


    async updateLogro(id, body) {
        try {
            const resultado = await Logros.findByIdAndUpdate(
                id,
                {
                    tipo_logro: body.tipo_logro,
                    descripcion: body.descripcion,
                    fecha_logro: body.fecha_logro,
                });

            return resultado;
        } catch (error) {
            throw new Error('Error al actualizar logro: ' + error.message);
        }
    }


    async deleteLogro(id) {
        try {
            return await Logros.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error al eliminar logro: ' + error.message);
        }
    }


    async getAllLogros(queries) {
        let filtros = {};

        // Filtrar por tipo de logro, si se proporciona
        if (queries?.tipo_logro) {
            filtros.tipo_logro = queries.tipo_logro;
        }

        // Filtrar por rango de fechas, si se proporcionan
        if (queries?.fecha_inicio && queries?.fecha_fin) {
            filtros.fecha_logro = { $gte: new Date(queries.fecha_inicio), $lte: new Date(queries.fecha_fin) };
        }

        try {
            return await Logros.find(filtros);
        } catch (error) {
            throw new Error('Error al obtener logros: ' + error.message);
        }
    }

    async getAdvancedLogros(filters) {
        let query = {};
    
        // Filtrar por tipo de logro
        if (filters.tipoLogro) {
            query.tipo_logro = filters.tipoLogro;
        }
    
        // Filtrar por palabras clave en la descripción
        if (filters.keyword) {
            query.descripcion = { $regex: filters.keyword, $options: 'i' };
        }
    
        // Filtrar por rango de fechas
        if (filters.fechaInicio && filters.fechaFin) {
            query.fecha_logro = {
                $gte: new Date(filters.fechaInicio),
                $lte: new Date(filters.fechaFin)
            };
        }
    
        try {
            return await Logros.find(query);
        } catch (error) {
            throw new Error('Error en la búsqueda avanzada: ' + error.message);
        }
    }
    
}

module.exports = new logrosService();
