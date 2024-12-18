// src/services/seguimientoSaludService.js

const SeguimientoSalud = require('../models/seguimientoSalud');

class seguimientoSaludService {


    async createSeguimientoSalud(data) {
        const nuevoSeguimiento = new SeguimientoSalud({
            fecha_inicial: data.fecha_inicial,
            fecha_final: data.fecha_final,
            metrica: data.metrica,
            valor_inicial: data.valor_inicial,
            valor_final: data.valor_final,
        });

        try {
            await nuevoSeguimiento.save();
        } catch (error) {
            throw new Error('Error al insertar seguimiento de salud: ' + error.message);
        }
    }


    async getSeguimientoSalud(id) {
        try {
            return await SeguimientoSalud.findById(id);
        } catch (error) {
            throw new Error('Error al obtener seguimiento de salud: ' + error.message);
        }
    }


    async updateSeguimientoSalud(id, body) {
        try {
            const resultado = await SeguimientoSalud.findByIdAndUpdate(
                id,
                {
                    fecha_inicial: body.fecha_inicial,
                    fecha_final: body.fecha_final,
                    metrica: body.metrica,
                    valor_inicial: body.valor_inicial,
                    valor_final: body.valor_final,
                });

            return resultado;
        } catch (error) {
            throw new Error('Error al actualizar seguimiento de salud: ' + error.message);
        }
    }

    async deleteSeguimientoSalud(id) {
        try {
            return await SeguimientoSalud.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error al eliminar seguimiento de salud: ' + error.message);
        }
    }

   
    async getAllSeguimientosSalud(queries) {
        let filtros = {};

        // Filtrar por métrica, si se proporciona
        if (queries?.metrica) {
            filtros.metrica = queries.metrica;
        }

        // Filtrar por rango de fechas, si se proporcionan
        if (queries?.fecha_inicial && queries?.fecha_final) {
            filtros.fecha_inicial = { $gte: new Date(queries.fecha_inicial) };
            filtros.fecha_final = { $lte: new Date(queries.fecha_final) };
        }

        try {
            return await SeguimientoSalud.find(filtros);
        } catch (error) {
            throw new Error('Error al obtener seguimientos de salud: ' + error.message);
        }
    }

    async getAdvancedSeguimientoSalud(filters) {
        let query = {};
    
        // Filtrar por métrica
        if (filters.metrica) {
            query.metrica = filters.metrica;
        }
    
        // Filtrar por rango de fechas
        if (filters.fechaInicio && filters.fechaFin) {
            query.fecha_inicial = { $gte: new Date(filters.fechaInicio) };
            query.fecha_final = { $lte: new Date(filters.fechaFin) };
        }
    
        // Filtrar por rango de valores iniciales
        if (filters.valorInicialMin && filters.valorInicialMax) {
            query.valor_inicial = {
                $gte: parseFloat(filters.valorInicialMin),
                $lte: parseFloat(filters.valorInicialMax),
            };
        }
    
        // Filtrar por rango de valores finales
        if (filters.valorFinalMin && filters.valorFinalMax) {
            query.valor_final = {
                $gte: parseFloat(filters.valorFinalMin),
                $lte: parseFloat(filters.valorFinalMax),
            };
        }
    
        try {
            return await SeguimientoSalud.find(query);
        } catch (error) {
            throw new Error('Error en la búsqueda avanzada de Seguimiento de Salud: ' + error.message);
        }
    }
    
}

module.exports = new seguimientoSaludService();
