// src/services/historiasExitoService.js

const HistoriasExito = require('../models/historiasExito');

class historiasExitoService {


    async createHistoriaExito(data) {
        const nuevaHistoria = new HistoriasExito({
            titulo_historia: data.titulo_historia,
            contenido: data.contenido,
            fecha_publicacion: data.fecha_publicacion,
            estado_publicacion: data.estado_publicacion,
        });

        try {
            await nuevaHistoria.save();
        } catch (error) {
            throw new Error('Error al insertar historia de éxito: ' + error.message);
        }
    }

    async getHistoriaExito(id) {
        try {
            return await HistoriasExito.findById(id);
        } catch (error) {
            throw new Error('Error al obtener historia de éxito: ' + error.message);
        }
    }


    async updateHistoriaExito(id, body) {
        try {
            const resultado = await HistoriasExito.findByIdAndUpdate(
                id,
                {
                    titulo_historia: body.titulo_historia,
                    contenido: body.contenido,
                    fecha_publicacion: body.fecha_publicacion,
                    estado_publicacion: body.estado_publicacion,
                });

            return resultado;
        } catch (error) {
            throw new Error('Error al actualizar historia de éxito: ' + error.message);
        }
    }

    async deleteHistoriaExito(id) {
        try {
            return await HistoriasExito.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Error al eliminar historia de éxito: ' + error.message);
        }
    }


    async getAllHistoriasExito(queries) {
        let filtros = {};

        // Filtrar por estado de publicación, si se proporciona
        if (queries?.estado_publicacion) {
            filtros.estado_publicacion = queries.estado_publicacion;
        }

        // Filtrar por rango de fechas de publicación, si se proporcionan
        if (queries?.fecha_inicio && queries?.fecha_fin) {
            filtros.fecha_publicacion = { $gte: new Date(queries.fecha_inicio), $lte: new Date(queries.fecha_fin) };
        }

        try {
            return await HistoriasExito.find(filtros);
        } catch (error) {
            throw new Error('Error al obtener historias de éxito: ' + error.message);
        }
    }
}

module.exports = new historiasExitoService();
