// src/services/usuarioService.js

const Usuario = require('../models/usuario');

class UsuariosService {
    async createUsuario(data) {
        const usuario = new Usuario(data);
        await usuario.save();
        return usuario;
    }

    async getUsuario(id) {
        return await Usuario.findById(id);
    }

    async updateUsuario(id, data) {
        return await Usuario.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteUsuario(id) {
        return await Usuario.findByIdAndDelete(id);
    }

    async getAllUsuarios(queries) {
        try {
            // Filtrar por edad
            if (queries?.edadMin && queries?.edadMax) {
                const match = {
                    edad: { $gte: queries.edadMin, $lte: queries.edadMax }
                };
                return await Usuario.find(match);
            }
            // Filtrar por país
            else if (queries?.pais) {
                const match = { pais: queries.pais };
                return await Usuario.find(match);
            }
            // Obtener todos los usuarios
            return await Usuario.find(queries);
        } catch (error) {
            throw new Error('Error al filtrar los usuarios: ' + error.message);
        }
    }
}

module.exports = new UsuariosService();
