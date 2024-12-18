// src/services/alimentacionService.js

const Alimentacion = require('../models/alimentacion');

class alimentacionService {

    async createAlimentacion(data) {
        const nuevoAlimentacion = new Alimentacion({
            comidas: data.comidas,
            calorias_totales: data.calorias_totales,
            agua_consumida_ml: data.agua_consumida_ml,
            sugerencias_nutricionales: data.sugerencias_nutricionales,
        });

        try {
            await nuevoAlimentacion.save();
        } catch (error) {
            throw new Error('Error al insertar registro de alimentación: ' + error.message);
        }
    }


    async getAlimentacion(id) {
        return await Alimentacion.findById(id);
    }

    async updateAlimentacion(id, body) {
        try {
            const resultado = await Alimentacion.findByIdAndUpdate(id, {
                comidas: body.comidas,
                calorias_totales: body.calorias_totales,
                agua_consumida_ml: body.agua_consumida_ml,
                sugerencias_nutricionales: body.sugerencias_nutricionales,
            });
            return resultado;
        } catch (error) {
            console.log("Error al actualizar el registro de alimentación:", error);
        }
    }

    async deleteAlimentacion(id) {
        return await Alimentacion.findByIdAndDelete(id);
    }


    async getAllAlimentacion(queries) {
        let alimentaciones;
        try {
            // Filtrar por cantidad de calorías, si se proporciona
            if (queries?.calorias_totales) {
                queries = { calorias_totales: queries.calorias_totales };
                return await Alimentacion.find(queries);
            }

            // Filtrar por cantidad de agua consumida, si se proporciona
            else if (queries?.agua_consumida_ml) {
                queries = { agua_consumida_ml: queries.agua_consumida_ml };
                return await Alimentacion.find(queries);
            } else {
                alimentaciones = await Alimentacion.find({});
            }
            return alimentaciones;
        } catch (error) {
            throw new Error('Error al filtrar los registros de alimentación: ' + error.message);
        }
    }

    async getAdvancedAlimentacion(filters) {
        let query = {};
    
        // Filtrar por rango de calorías
        if (filters.caloriasMin && filters.caloriasMax) {
            query.calorias_totales = {
                $gte: parseInt(filters.caloriasMin),
                $lte: parseInt(filters.caloriasMax)
            };
        }
    
        // Filtrar por agua consumida
        if (filters.aguaMin && filters.aguaMax) {
            query.agua_consumida_ml = {
                $gte: parseInt(filters.aguaMin),
                $lte: parseInt(filters.aguaMax)
            };
        }
    
        // Filtrar por palabras clave en sugerencias
        if (filters.sugerenciasKeyword) {
            query.sugerencias_nutricionales = { $regex: filters.sugerenciasKeyword, $options: 'i' };
        }
    
        try {
            return await Alimentacion.find(query);
        } catch (error) {
            throw new Error('Error en la búsqueda avanzada: ' + error.message);
        }
    }
    
}

module.exports = new alimentacionService();
