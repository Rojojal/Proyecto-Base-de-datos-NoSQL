// src/services/actividadFisicaService.js

const ActividadFisica = require('../models/actividadFisica');

class actividadFisicaService {


    async createActividadFisica(data) {
        const nuevaActividadFisica = new ActividadFisica({
            fecha: data.fecha,
            tipo_actividad: data.tipo_actividad,
            duracion_minutos: data.duracion_minutos,
            calorias_quemadas: data.calorias_quemadas,
        });

        try {
            await nuevaActividadFisica.save();
        } catch (error) {
            throw new Error('Error al insertar registro de actividad física: ' + error.message);
        }
    }


    async getActividadFisica(id) {
        return await ActividadFisica.findById(id);
    }


    async updateActividadFisica(id, body) {
        try {
            const resultado = await ActividadFisica.findByIdAndUpdate(id, {
                fecha: body.fecha,
                tipo_actividad: body.tipo_actividad,
                duracion_minutos: body.duracion_minutos,
                calorias_quemadas: body.calorias_quemadas,
            });
            return resultado;
        } catch (error) {
            console.log("Error al actualizar el registro de actividad física:", error);
        }
    }


    async deleteActividadFisica(id) {
        return await ActividadFisica.findByIdAndDelete(id);
    }

    async getAllActividadFisica(queries) {
        let actividadFisica;
        try {
            // Filtrar por tipo de actividad, si se proporciona
            if (queries?.tipo_actividad) {
                queries = { tipo_actividad: queries.tipo_actividad };
                return await ActividadFisica.find(queries);
            }

            // Filtrar por duración de actividad, si se proporciona
            else if (queries?.duracion_minutos) {
                queries = { duracion_minutos: queries.duracion_minutos };
                return await ActividadFisica.find(queries);
            } else {
                actividadFisica = await ActividadFisica.find({});
            }
            return actividadFisica;
        } catch (error) {
            throw new Error('Error al filtrar los registros de actividad física: ' + error.message);
        }
    }

    
    async getAdvancedActividadFisica(filters) {
        let query = {};
        
        // Filtrar por rango de fechas
        if (filters.fechaInicio && filters.fechaFin) {
            query.fecha = {
                $gte: new Date(filters.fechaInicio),
                $lte: new Date(filters.fechaFin)
            };
        }
    
        // Filtrar por duración mínima
        if (filters.duracionMin) {
            query.duracion_minutos = { ...query.duracion_minutos, $gte: parseInt(filters.duracionMin) };
        }
    
        // Filtrar por duración máxima
        if (filters.duracionMax) {
            query.duracion_minutos = { ...query.duracion_minutos, $lte: parseInt(filters.duracionMax) };
        }
    
        // Filtrar por tipo de actividad
        if (filters.tipoActividad) {
            query.tipo_actividad = filters.tipoActividad;
        }
    
        try {
            return await ActividadFisica.find(query);
        } catch (error) {
            throw new Error('Error en la búsqueda avanzada: ' + error.message);
        }
    }
    
}

module.exports = new actividadFisicaService();
