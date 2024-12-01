// src/services/itemService.js

const Item = require('../models/item');

class ItemService {
    async createItem(data) {
        const item = new Item(data);
        await item.save();
        return item;
    }

    async getItem(id) {
        return await Item.findById(id);
    }

    async updateItem(id, data) {
        return await Item.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteItem(id) {
        return await Item.findByIdAndDelete(id);
    }

    async getAllItems(queries) {
        try {
            // Nota menor a 70
            if (queries?.notaCiencias) {
                queries = { notaCiencias: { $lte: 70 } }
                return await Item.find(queries);
            }
            // Promedio segun el cuatri
            else if (queries?.CuatrimestrePromedio) {
                const match = { Cuatrimestre: parseInt(queries?.CuatrimestrePromedio) };
                const result = await Item.aggregate([
                    {
                        $match: match
                    },
                    {
                        $group: {
                            _id: null,
                            promedioMatematicas: { $avg: "$notaMatematicas" },
                            promedioCiencias: { $avg: "$notaCiencias" },
                            promedioLiteratura: { $avg: "$notaLiteratura" },
                            promedioCivica: { $avg: "$notaCivica" }
                        }
                    }
                ]);

                return result;

            }
            return await Item.find(queries);
        } catch (error) {
            throw new Error('Error al filtrar los items: ' + error.message);
        }
    }

}

module.exports = new ItemService();
